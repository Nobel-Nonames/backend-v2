import { ForbiddenException, Module, UnauthorizedException } from '@nestjs/common';
import { ModelController } from './model.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { ModelService } from './model.service';
import FileSystem from 'src/utils/fileSystem';
import * as path from 'path';
import getRandom from 'src/utils/getRandom';
import { MongooseModule } from '@nestjs/mongoose';
import Image, { ImageSchema } from 'src/schemas/images/image.schema';
import { SystemModule } from 'src/system/system.module';
import Projects, { ProjectInfoSchema } from 'src/schemas/project/info.schema';
import DeepLearns, { DeepLearnSchema } from 'src/schemas/images/deeplearn.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Image.name, schema: ImageSchema },
      { name: Projects.name, schema: ProjectInfoSchema },
      { name: DeepLearns.name, schema: DeepLearnSchema }
    ]),
    MulterModule.registerAsync({
      imports: [AuthModule],
      inject: [AuthService],
      useFactory: (authService: AuthService): MulterOptions => ({
        storage: diskStorage({
          async destination(req, file, callback) {
            const token = req.headers.authorization;
            const verify = await authService.verifyToken(token);
            const user = await authService.findOneById(verify.payload.id)

            if (!token || !verify || !user)
              return callback(
                new UnauthorizedException({
                  success: false,
                  message: '비 정상적인 토큰 입니다.'
                }),
                'public/trash'
              );
            else {
              return callback(null, `public/tmp/${user.username}/tp`);
            }
          },
          filename: (_, file, callback) => {
            const now = new Date();
            const extension = path.extname(file.originalname);
            return callback(null, file.fieldname + '-' + getRandom('all', 32) + now.getTime() + extension);
          }
        }),
        fileFilter: async (req, file: Express.Multer.File, callback) => {
          const fs = new FileSystem()
          const status = fs.mimeCheck(file, ['image/png', 'image/jpeg'])

          if (status) {
            return callback(null, true)
          } else return callback(
            new ForbiddenException({
              success: false,
              message: '파일 확장자를 체크해주세요.'
            }),
            false
          )
        },
        limits: { fileSize: 500 * 1024 * 1024 }
      })
    }),
    AuthModule,
    SystemModule
  ],
  controllers: [ModelController],
  providers: [ModelService]
})
export class ModelModule { }
