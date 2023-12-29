import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import ProjectsEntity from 'src/entitiy/project/info.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectsEntity]),
    AuthModule
  ],
  providers: [ProjectService],
  exports: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule { }
