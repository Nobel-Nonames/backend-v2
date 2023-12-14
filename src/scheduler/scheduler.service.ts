import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
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
      await this.systemService.systemCreate({
        event_number: 1,
        createdAt: new Date()
      });

      return
    } else {
      last.event_number += 1;
      await this.systemService.systemDocSave(last);

      return
    }
  }
}
