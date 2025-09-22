import { Injectable } from '@nestjs/common';
import { HealthCheckResponseDto } from './dto/health-check.dto';
import { version } from '../../../package.json';

@Injectable()
export class HealthCheckService {
  getHealthCheck(): HealthCheckResponseDto {
    return {
      healthy: true,
      timestamp: new Date().toISOString(),
      message: 'Service is running smoothly',
      version: version,
    };
  }
}
