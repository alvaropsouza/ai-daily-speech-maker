import { ApiProperty } from '@nestjs/swagger';

export class ActivityDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  speech_id?: string | null;

  @ApiProperty()
  created_at?: Date | null;

  @ApiProperty()
  updated_at?: Date | null;
}
