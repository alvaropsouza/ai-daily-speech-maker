import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GetUserActivitiesRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ required: false, example: '2023-10-25' })
  date: string;
}
