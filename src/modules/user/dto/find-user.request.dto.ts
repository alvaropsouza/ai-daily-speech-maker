import { ApiProperty } from '@nestjs/swagger';

export class FindUserRequestDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  email: string;
}
