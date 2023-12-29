import { Body, Controller, ForbiddenException, Headers, HttpCode, HttpStatus, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { existsSync } from 'fs';
import moment from 'moment';
import { extname, join } from 'path';
import { cwd } from 'process';
import { AuthGuard } from 'src/auth/auth.guard';
import FileSystem from 'src/utils/fileSystem';
import child from 'child_process'
import { ModelService } from './model.service';
import { AuthService } from 'src/auth/auth.service';
import { SystemService } from 'src/system/system.service';
import UploadImagesDto from './dto/request/UploadImages.dto';
import ImagesEntity from 'src/entitiy/images/image.entity';
import { PythonService } from 'src/python/python.service';
import { ProjectService } from 'src/project/project.service';
import InspectRequestDto from './dto/request/InspectRequest.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import SuccessResponseDto from 'src/dto/success.dto';

@Controller('model')
export class ModelController {
  constructor(
    private readonly authService: AuthService,
    private readonly modelService: ModelService,
    private readonly systemService: SystemService,
    private readonly pythonService: PythonService,
    private readonly projectService: ProjectService
  ) { }
  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "이미지 업로드", description: "이미지 업로드 합니다. (인공지능도 돌아감)" })
  async uploadFile(
    @Headers("Authorization") token: string,
    @Body() dto: UploadImagesDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    const user = await this.authService.findOneByToken(token);
    const project = await this.projectService.findOneByUuid(dto.project_id);
    project.status = "Uploading";
    await this.projectService.projectSave(project)
    if (!project)
      throw new ForbiddenException({ success: false, message: '올바른 project_id 값을 넣어주세요.' })

    let state = {
      success: 0,
      duplicate: 0,
      undefined: 0,
      error: 0
    };

    files.map(async (value) => {
      const data = JSON.parse(child.execSync('exiftool -j -b ' + value.path) as unknown as string)[0];

      if (!data) {
        state.undefined += 1;
        return value
      }

      if (existsSync(process.cwd() + value.path)) {
        state.duplicate += 1;
        return value
      }

      const extension = extname(value.originalname);
      const filename = `${moment(data.DateTimeOriginal).format("YYYYMMDD-HHmmss")}${(data.Sequence as string).replace(/\s/gi, '')}.${extension}`;
      new FileSystem().mv(value.path, join(cwd(), 'public', user.username, 'mv', `${value.originalname}`))
      new FileSystem().cp(value.path, join(cwd(), 'public', user.username, 'rst', `${filename}`))

      const image = new ImagesEntity();
      image.serialFileName = `${data.SerialNumber}_${filename}`
      image.fileName = filename
      image.serialNumber = data.SerialNumber
      image.filePath = join(cwd(), 'public', user.username, 'mv', `${value.originalname}`)
      image.thumnailPath = undefined
      image.dateTimeOriginal = data.DateTimeOriginal
      image.exifData = data
      image.project = project

      project.status = "Analyzing"
      await this.modelService.imageCreate(image);
      await this.projectService.projectSave(project);
    })

    const python_res = await this.pythonService.runWildDetector({
      inputDir: join(cwd(), 'public', 'mv')
    })

    python_res.map(async (value) => {
      const file = await this.modelService.findOneByPath(value.file);

      if (value.prediction.length > 1) {
        value.prediction = value.prediction.sort((a, b) => {
          if (a === null) {
            return 1;
          } else if (b === null) {
            return -1;
          } else {
            return a.best_probability > b.best_probability ? -1 : a.best_probability < b.best_probability ? 1 : 0;
          }
        })
      }

      file.count = value.prediction.length;

      file.bestClass = value.prediction[0].best_class;
      file.bestprob = value.prediction[0].best_probability;
      file.thumnailPath = value.file;
      project.thumnailPath = value.file;
      file.evtNum = await this.systemService.getLastEventNumber() ?? 0
      file.evtDate = new Date()
      file.className = PythonService.class_name_array[+value.prediction[0].best_class]
      file.x1 = value.prediction[0].bbox[0]
      file.y1 = value.prediction[0].bbox[1]
      file.x2 = value.prediction[0].bbox[2]
      file.y2 = value.prediction[0].bbox[3]
      await this.modelService.imageCreate(file);
      await this.projectService.projectSave(project);
    })

    project.status = "finish";
    await this.projectService.projectSave(project);

    return { success: true, state };
  }

  @Put('/inspect')
  @ApiOperation({ summary: "이미지 검수", description: "이미지 검수 합니다." })
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: "success", type: SuccessResponseDto })
  @HttpCode(HttpStatus.OK)
  async inspect(
    @Body() dto: InspectRequestDto
  ) {

  }
}
