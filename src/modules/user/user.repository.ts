import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(request: Prisma.UserCreateInput): Promise<User> {
    const user = this.prisma.user.create({
      data: {
        email: request.email,
        name: request.name,
        created_at: new Date(),
      },
    });

    return user;
  }

  async findUser(request: { email: string }): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: request.email },
    });

    return user;
  }
}
