import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength } from 'class-validator';

export class CreateActivityRequestDto {
  @ApiProperty()
  @MaxLength(280)
  content: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
