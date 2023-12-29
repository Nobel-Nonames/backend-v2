import { Body, Controller, Headers, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ProjectService } from './project.service';
import { AuthGuard } from 'src/auth/auth.guard';
import CreateProjectDto from './dto/CreateProject.dto';
import ProjectsEntity from 'src/entitiy/project/info.entity';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly authService: AuthService,
    private readonly projectService: ProjectService
  ) { }

  @Post('/project/create')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createProject(
    @Headers("Authorization") token: string,
    @Body() dto: CreateProjectDto
  ) {
    const user = await this.authService.findOneByToken(token);

    const project = new ProjectsEntity()
    project.address = dto.address
    project.author = user
    project.projectName = dto.name
    project.status = "Ready"
    project.etc = dto.etc
    project.thumnailPath = ''


    await this.projectService.projectSave(project)
    return { success: true }
  }
}
