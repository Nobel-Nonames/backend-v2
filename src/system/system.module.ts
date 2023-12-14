import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { MongooseModule } from '@nestjs/mongoose';
import Systems, { SystemSchema } from 'src/schemas/system.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Systems.name, schema: SystemSchema }]),
  ],
  exports: [SystemService],
  controllers: [SystemController],
  providers: [SystemService]
})
export class SystemModule { }
