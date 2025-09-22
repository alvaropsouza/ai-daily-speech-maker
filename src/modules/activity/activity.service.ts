import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ActivityRepository } from './activity.repository';
import { CreateActivityRequestDto } from './dto/create-activity.request.dto';
import { GetUserActivitiesRequestDto } from './dto/get-user-activities.request.dto';
import { GetUserActivitiesResponseDto } from './dto/user-activities.response.dto';
import { OpenAiService } from '../openai/openai.service';
import { activitiesPrompt } from '../../modules/openai/prompts/activities.prompt';
import { ActivityDto } from './dto/activity.dto';
import { Logger } from '../../config/logger/logger.config';

@Injectable()
export class ActivityService {
  private logger: Logger = new Logger(ActivityService.name);

  constructor(
    private activityRepository: ActivityRepository,
    private aiService: OpenAiService,
  ) {}

  async createActivity(
    request: CreateActivityRequestDto,
  ): Promise<ActivityDto> {
    this.logger.log(`Creating activity for user: ${request.email}`);

    const { endOfDay, startOfDay } = this.getDayRange();

    const todayUserActivities =
      await this.activityRepository.findUserActivitiesByDate({
        date: {
          start: startOfDay.toISOString(),
          end: endOfDay.toISOString(),
        },
        email: request.email,
      });

    this.logger.log(
      `Found ${todayUserActivities.length} activities for user ${request.email} today`,
    );

    const activityExists = todayUserActivities
      .map((activity) => activity.content)
      .includes(request.content);

    if (activityExists) {
      this.logger.warn(
        `Activity "${request.content}" already exists for user ${request.email} today`,
      );
      throw new BadRequestException('Activity already exists for today');
    }

    const activity = await this.activityRepository.insertActivity({
      content: request.content,
      User: { connect: { email: request.email } },
    });

    this.logger.log(
      `Inserted new activity "${request.content}" for user ${request.email}`,
    );

    return activity;
  }

  async getUserActivities({
    email,
    date,
  }: GetUserActivitiesRequestDto): Promise<GetUserActivitiesResponseDto> {
    this.logger.log(
      `Fetching activities for user: ${email} on date: ${date ?? 'today'}`,
    );

    const { endOfDay, startOfDay } = this.getDayRange(date);
    const activities = await this.activityRepository.findUserActivitiesByDate({
      date: {
        start: startOfDay.toISOString(),
        end: endOfDay.toISOString(),
      },
      email,
    });

    if (!activities.length) {
      this.logger.warn(
        `No activities found for user ${email} at ${date ?? 'today'}`,
      );
      throw new NotFoundException(
        `No activities found for user ${email} at ${date}`,
      );
    }

    const activitiesSummary = await this.aiService.chat([
      activitiesPrompt(activities).getActivitiesSummaryPrompt,
    ]);

    this.logger.log(
      `Generated summary for user ${email} on date ${date ?? 'today'}`,
    );

    return { email, summary: activitiesSummary, activities };
  }

  getDayRange(date?: string): { startOfDay: Date; endOfDay: Date } {
    let startOfDay: Date;
    let endOfDay: Date;

    const now = new Date();
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    startOfDay = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
    endOfDay = new Date(`${year}-${month}-${day}T23:59:59.999Z`);

    if (date) {
      startOfDay = new Date(`${date}T00:00:00.000Z`);
      endOfDay = new Date(`${date}T23:59:59.999Z`);
    }

    return { startOfDay, endOfDay };
  }
}
