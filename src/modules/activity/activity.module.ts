import { Module } from '@nestjs/common';
import { ActivityRepository } from './activity.repository';
import { ActivitiesController } from './activities.controller';
import { ActivityService } from './activity.service';
import { PrismaService } from '../../prisma.service';
import { OpenAiService } from '../openai/openai.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [ActivitiesController],
  providers: [
    ActivityService,
    ActivityRepository,
    PrismaService,
    OpenAiService,
  ],
  exports: [ActivityService, ActivityRepository],
})
export class ActivityModule {}
