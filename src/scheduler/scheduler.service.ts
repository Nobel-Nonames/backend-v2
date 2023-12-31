import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import SystemEntity from 'src/entities/system.entity';
import { SystemService } from 'src/system/system.service';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly systemService: SystemService
  ) { }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async updateEvent() {
    const last = await this.systemService.findOneByLastData();
    if (!last) {
      const last = new SystemEntity();
      last.event_number = 1;
      await this.systemService.systemSave(last);

      return
    } else {
      last.event_number += 1;
      await this.systemService.systemSave(last);

      return
    }
  }
}
