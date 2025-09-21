import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
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

  async findUser(request: Prisma.UserWhereInput): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: request.email,
        name: request.name,
      },
    });

    return user;
  }
}
