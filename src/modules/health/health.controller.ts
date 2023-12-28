import { Controller, Get } from '@nestjs/common';

@Controller('v1')
export class HealthController {

  @Get('health')
  getStatus(): any {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
    };
  }
}