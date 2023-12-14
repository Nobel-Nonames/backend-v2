import { Body, Controller, Headers, HttpCode, HttpStatus, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
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
import CreateProjectDto from './dto/request/CreateProject.dto';
import UploadImagesDto from './dto/request/UploadImages.dto';

@Controller('model')
export class ModelController {
  constructor(
    private readonly authService: AuthService,
    private readonly modelService: ModelService,
    private readonly systemService: SystemService
  ) { }

  @Post('/project/create')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createProject(
    @Headers("Authorization") token: string,
    @Body() dto: CreateProjectDto
  ) {
    const user = await this.authService.findOneByToken(token);

    await this.modelService.createProject(dto.name, dto.address, user)
    return { success: true }
  }

  @Post('/upload')
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async uploadFile(
    @Headers("Authorization") token: string,
    @Body() dto: UploadImagesDto,
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    const user = await this.authService.findOneByToken(token);
    const project = await this.modelService.findOneByProjectId(dto.project_id);

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
      new FileSystem().cp(value.path, join(cwd(), 'public', user.username, 'mv', `${value.originalname}`))
      new FileSystem().cp(value.path, join(cwd(), 'public', user.username, 'rst', `${filename}`))

      await this.modelService.imageCreate({
        serialFileName: `${data.SerialNumber}_${filename}`,
        fileName: filename,
        serialNumber: data.SerialNumber,
        filePath: join(cwd(), 'public', user.username, 'mv', `${value.originalname}`),
        thumnailPath: undefined,
        dateTimeOriginal: data.DateTimeOriginal,
        exifData: data,
        projectInfo: project._id
      })
    })

    return { success: true, state }
  }
}
