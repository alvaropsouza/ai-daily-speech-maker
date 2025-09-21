import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckResponseDto {
  @ApiProperty()
  healthy: boolean;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  version: string;
}
