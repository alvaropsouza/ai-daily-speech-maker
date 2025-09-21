import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { HealthCheckResponseDto } from './dto/health-check.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health Check')
@Controller()
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get('health')
  getHealthCheck(): HealthCheckResponseDto {
    return this.healthCheckService.getHealthCheck();
  }
}
