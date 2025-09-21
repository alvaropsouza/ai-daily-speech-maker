import { Injectable } from '@nestjs/common';
import { HealthCheckResponseDto } from './dto/health-check.dto';

@Injectable()
export class HealthCheckService {
  getHealthCheck(): HealthCheckResponseDto {
    return {
      healthy: true,
      timestamp: new Date().toISOString(),
      message: 'Service is running smoothly',
      version: 'version',
    };
  }
}
