import { Module } from '@nestjs/common';
import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import SystemEntity from 'src/entitiy/system.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([SystemEntity])
  ],
  exports: [SystemService],
  controllers: [SystemController],
  providers: [SystemService]
})
export class SystemModule { }
