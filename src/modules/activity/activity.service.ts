import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ActivityRepository } from './activity.repository';
import { Activity } from '@prisma/client';
import { CreateActivityRequestDto } from './dto/create-activity.request.dto';
import { GetUserActivitiesRequestDto } from './dto/get-user-activities.request.dto';
import { GetUserActivitiesResponseDto } from './dto/user-activities.response.dto';

@Injectable()
export class ActivityService {
  constructor(private activityRepository: ActivityRepository) {}

  async createActivity(request: CreateActivityRequestDto): Promise<Activity> {
    const { endOfDay, startOfDay } = this.getDayRange();

    const todayUserActivities =
      await this.activityRepository.findUserActivitiesByDate({
        date: {
          start: startOfDay.toISOString(),
          end: endOfDay.toISOString(),
        },
        email: request.email,
      });

    const activityExists = todayUserActivities
      .map((activity) => activity.content)
      .includes(request.content);

    if (activityExists) {
      throw new BadRequestException('Activity already exists for today');
    }

    const activity = await this.activityRepository.insertActivity({
      content: request.content,
      User: { connect: { email: request.email } },
    });

    return activity;
  }

  async getUserActivities({
    email,
    date,
  }: GetUserActivitiesRequestDto): Promise<GetUserActivitiesResponseDto> {
    const { endOfDay, startOfDay } = this.getDayRange(date);
    const activities = await this.activityRepository.findUserActivitiesByDate({
      date: {
        start: startOfDay.toISOString(),
        end: endOfDay.toISOString(),
      },
      email,
    });

    if (!activities.length) {
      throw new NotFoundException(`No activities found for user ${email}`);
    }
    return { email, activities };
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
