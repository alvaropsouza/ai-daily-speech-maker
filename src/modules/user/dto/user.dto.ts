import { ApiProperty } from '@nestjs/swagger';
import { Speech } from 'generated/prisma';

export class UserDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  speeches?: Speech[];

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;
}
