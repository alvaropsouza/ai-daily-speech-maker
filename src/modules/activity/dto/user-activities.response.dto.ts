import { ApiProperty } from '@nestjs/swagger';
import { Activity } from '@prisma/client';

export class GetUserActivitiesResponseDto {
  @ApiProperty()
  activities: Activity[];

  @ApiProperty()
  summary: string;

  @ApiProperty()
  email: string;
}
