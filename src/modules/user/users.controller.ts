import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() request: UserDto): Promise<UserDto> {
    const user = await this.userService.createUser(request);

    return user;
  }

  @Get(':email')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  async findUserById(@Param('email') email: string): Promise<UserDto | null> {
    const user = await this.userService.getUser({ email });

    return user;
  }
}
