import { Module } from '@nestjs/common';
import { HealthCheckController } from './modules/health-check/health-check.controller';
import { HealthCheckService } from './modules/health-check/health-check.service';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './modules/user/users.controller';
import { UserService } from './modules/user/user.service';
import { UserRepository } from './modules/user/user.repository';

@Module({
  imports: [],
  controllers: [HealthCheckController, UserController],
  providers: [HealthCheckService, PrismaService, UserRepository, UserService],
})
export class AppModule {}
