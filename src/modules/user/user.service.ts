import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { FindUserRequestDto } from './dto/find-user.request.dto';
import { Logger } from '../../config/logger/logger.config';

@Injectable()
export class UserService {
  private logger: Logger = new Logger(UserService.name);

  constructor(private userRepository: UserRepository) {}

  async createUser(request: UserDto): Promise<User> {
    try {
      this.logger.log(`Creating user with email: ${request.email}`);

      const userExists = await this.userRepository.findUser({
        email: request.email,
      });

      if (userExists) {
        throw new UnprocessableEntityException('User already exists');
      }

      this.logger.log(
        `User with email ${request.email} does not exist, creating`,
      );

      const user = await this.userRepository.createUser({
        email: request.email,
        name: request.name,
      });

      this.logger.log(`User with email ${request.email} created successfully`);

      return user;
    } catch (error) {
      this.logger.error(
        `Error creating user with email ${request.email}: ${error}`,
      );
      throw error;
    }
  }

  async getUser(request: FindUserRequestDto): Promise<User | null> {
    try {
      this.logger.log(`Finding user with criteria: ${JSON.stringify(request)}`);

      const user = await this.userRepository.findUser(request);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      this.logger.log(`User found: ${JSON.stringify(user)}`);

      return user;
    } catch (error) {
      this.logger.error(
        `Error finding user with criteria ${JSON.stringify(request)}: ${error}`,
      );
      throw error;
    }
  }
}
