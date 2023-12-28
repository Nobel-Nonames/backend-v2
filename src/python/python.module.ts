import { Module } from '@nestjs/common';
import { PythonService } from './python.service';

@Module({
  exports: [PythonService],
  providers: [PythonService]
})
export class PythonModule { }
