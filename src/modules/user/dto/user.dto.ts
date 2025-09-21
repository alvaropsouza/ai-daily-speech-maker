import { ApiProperty } from '@nestjs/swagger';
import { Speech } from '@prisma/client';
import { IsEmail } from 'class-validator';

export class UserDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  @IsEmail()
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
