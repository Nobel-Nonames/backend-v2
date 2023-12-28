import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigurationModule } from './configuration/configuration.module';
import { SystemModule } from './system/system.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelModule } from './model/model.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { PythonModule } from './python/python.module';
import UsersEntity from './entitiy/auth/user.entity';
import ImagesEntity from './entitiy/images/image.entity';
import DeepLearnsEntity from './entitiy/images/deeplearn.entity';
import SystemEntity from './entitiy/system.entity';
import ProjectsEntity from './entitiy/project/info.entity';
import ProjectInspectEntity from './entitiy/project/inspect.schema';

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
          UsersEntity, ImagesEntity, DeepLearnsEntity,
          SystemEntity, ProjectsEntity, ProjectInspectEntity
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
    PythonModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
