import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserController } from './users.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UserController],
  imports: [],
  providers: [UserService, UserRepository, PrismaService],
  exports: [],
})
export class UserModule {}
