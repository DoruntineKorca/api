import { HealthController } from './health/health.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [],
})
export class AppModule { }