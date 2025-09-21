import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { FindUserRequestDto } from './dto/find-user.request.dto';
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

  @Get()
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.NOT_FOUND)
  async findUser(
    @Query() request: FindUserRequestDto,
  ): Promise<UserDto | null> {
    const user = await this.userService.getUser(request);
    return user;
  }
}
