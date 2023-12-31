import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationModule } from './configuration/configuration.module';
import { SystemModule } from './system/system.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { ModelModule } from './model/model.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { PythonModule } from './python/python.module';
import { ProjectModule } from './project/project.module';
import UsersEntity from './entities/auth/user.entity';
import ImagesEntity from './entities/images/image.entity';
import SystemEntity from './entities/system.entity';
import ProjectsEntity from './entities/project/info.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_SCHEMA'),
        entities: [
          UsersEntity, ImagesEntity,
          SystemEntity, ProjectsEntity
        ],
        logging: configService.get<boolean>('DATABASE_LOGGING'),
        synchronize: configService.get<boolean>('DATABASE_SYNCHRONIZE')
      })
    }),
    ConfigurationModule,
    SystemModule,
    AuthModule,
    ModelModule,
    SchedulerModule,
    PythonModule,
    ProjectModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
