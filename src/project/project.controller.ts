import { Body, Controller, ForbiddenException, Get, Headers, HttpCode, HttpStatus, Post, Query, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ProjectService } from './project.service';
import { AuthGuard } from 'src/auth/auth.guard';
import CreateProjectDto from './dto/request/CreateProject.dto';
import ProjectsEntity from 'src/entities/project/info.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import SuccessResponseDto from 'src/dto/success.dto';
import GetProjectsRequestDto from '../dto/GetByPageination.dto';
import GetProjectResponseDto from './dto/response/GetProjectResponse.dto';
import { ModelService } from 'src/model/model.service';
import { Response } from 'express';
import TargetDto from 'src/dto/target.dto';
import GetByPageinationDto from '../dto/GetByPageination.dto';
import GetProjectByImagesDto from './dto/response/GetProjectByImages.dto';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly authService: AuthService,
    private readonly projectService: ProjectService,
    private readonly modelService: ModelService
  ) { }

  @Post('/project/create')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: "프로젝트 만들기", description: "프로젝트를 생성합니다." })
  @ApiCreatedResponse({ description: "success", type: SuccessResponseDto })
  async createProject(
    @Headers("Authorization") token: string,
    @Body() dto: CreateProjectDto
  ) {
    const user = await this.authService.findOneByToken(token);

    if (user.type === "user")
      throw new ForbiddenException({ success: false, message: "일반 유저는 프로젝트를 생성 할 수 없습니다." })
    const project = new ProjectsEntity()
    project.address = dto.address
    project.author = user
    project.projectName = dto.name
    project.status = "Ready"
    project.ThumnailImage = undefined


    await this.projectService.projectSave(project)
    return { success: true }
  }

  @Get('/projects')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "프로젝트 가져오기", description: "프로젝트\"들\"을 가져옵니다." })
  @ApiOkResponse({ description: "success", type: GetByPageinationDto })
  async asyncGetProjects(
    @Query() dto: GetProjectsRequestDto
  ) {
    return { success: true, projects: await this.projectService.findByPagination(dto.page) }
  }

  @Get('/project')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "프로젝트 가져오기", description: "프로젝트를 가져옵니다." })
  @ApiOkResponse({ description: "success", type: GetProjectResponseDto })
  async asyncGetProject(
    @Query() dto: TargetDto
  ) {
    return { success: true, project: await this.projectService.findOneByUuid(dto.target) }
  }

  @Get('/image')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "이미지 파일 받기", description: "이미지 그대로 받아옵니다. (file)" })
  @ApiOkResponse({ description: "파일로 줌 (에러가 날 경우 json)" })
  async getFile(
    @Headers("Authorization") token: string,
    @Query() dto: TargetDto,
    @Res() res: Response
  ) {
    const user = await this.authService.findOneByToken(token);
    const file = await this.modelService.findOneByUuid(dto.target);

    if (user.type == "user" && !file.searchFlag) {
      throw new ForbiddenException({ success: false, message: "파일을 열람할 권한이 없습니다." })
    }

    return res.send(file.filePath)
  }

  @Get('/images')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "이미지 리스트 받기", description: "이미지 리스트를 받아옵니다." })
  @ApiOkResponse({ description: "페이지", type: GetProjectByImagesDto })
  async getProjectByImages(
    @Headers("Authorization") token: string,
    @Query() dto: GetByPageinationDto
  ) {
    const user = await this.authService.findOneByToken(token);

    if (user.type === "user") {
      return { success: true, images: await this.modelService.findByImageInUserPagination(dto.page) }
    } else {
      return { success: true, images: await this.modelService.findByImageInAllPagination(dto.page) }
    }
  }
}
