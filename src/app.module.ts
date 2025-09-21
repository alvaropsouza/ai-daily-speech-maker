import { Module } from '@nestjs/common';
import { HealthCheckController } from './modules/health-check/health-check.controller';
import { HealthCheckService } from './modules/health-check/health-check.service';
import { PrismaService } from 'src/prisma.service';
import { UserController } from './modules/user/users.controller';
import { UserService } from './modules/user/user.service';
import { UserRepository } from './modules/user/user.repository';
import { ActivityRepository } from './modules/activity/activity.repository';
import { ActivitiesController } from './modules/activity/activities.controller';
import { ActivityService } from './modules/activity/activity.service';
import { AiService } from './modules/openai/openai.service';
import { ConfigModule } from '@nestjs/config';
import envs from './config/envs.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [envs],
    }),
  ],
  controllers: [HealthCheckController, UserController, ActivitiesController],
  providers: [
    HealthCheckService,
    PrismaService,
    UserRepository,
    UserService,
    ActivityRepository,
    ActivityService,
    AiService,
  ],
})
export class AppModule {}
