import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(
    private readonly systemService: SystemService
  ) { }

  @Get('/evt_num')
  @HttpCode(HttpStatus.OK)
  async getEventNumber() {
    return { success: true, num: (await this.systemService.findOneByLastData()).event_number ?? 0 }
  }
}
