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

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: `mongodb://${configService.get('DATABASE_HOST')}:${configService.get('DATABASE_PORT')}`,
        user: configService.get('DATABASE_USERNAME'),
        pass: configService.get('DATABASE_PASSWORD')
      })
    }),
    ConfigurationModule,
    SystemModule,
    AuthModule,
    ModelModule,
    SchedulerModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
