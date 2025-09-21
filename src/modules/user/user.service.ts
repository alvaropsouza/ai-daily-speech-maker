import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { randomUUID } from 'crypto';
import { FindUserRequestDto } from './dto/find-user.request.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(request: UserDto): Promise<User> {
    const userExists = await this.userRepository.findUser({
      email: request.email,
    });

    if (userExists) {
      throw new UnprocessableEntityException('User already exists');
    }

    const user = await this.userRepository.createUser({
      id: randomUUID(),
      email: request.email,
      name: request.name,
    });

    return user;
  }

  async getUser(request: FindUserRequestDto): Promise<User | null> {
    const user = await this.userRepository.findUser({ ...request });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
