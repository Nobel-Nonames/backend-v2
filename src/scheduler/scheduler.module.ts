import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service';
import { SystemModule } from 'src/system/system.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SystemModule
  ],
  providers: [SchedulerService]
})
export class SchedulerModule { }
