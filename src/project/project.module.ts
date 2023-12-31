import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import ProjectsEntity from 'src/entities/project/info.entity';
import { AuthModule } from 'src/auth/auth.module';
import { ModelModule } from 'src/model/model.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectsEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => ModelModule)
  ],
  providers: [ProjectService],
  exports: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule { }
