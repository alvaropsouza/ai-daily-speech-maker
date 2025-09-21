import { ApiProperty } from '@nestjs/swagger';
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
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;
}
