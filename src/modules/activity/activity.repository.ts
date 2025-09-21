import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Activity, Prisma } from '@prisma/client';

@Injectable()
export class ActivityRepository {
  constructor(private prisma: PrismaService) {}

  async insertActivity(request: Prisma.ActivityCreateInput): Promise<Activity> {
    const activity = await this.prisma.activity.create({
      data: {
        content: request.content,
        created_at: new Date(),
        User: { connect: { email: request.User?.connect?.email } },
      },
    });

    return activity;
  }

  findUserActivitiesByDate(request: {
    email: string;
    date: {
      start: string;
      end: string;
    };
  }): Promise<Activity[]> {
    const activities = this.prisma.activity.findMany({
      where: {
        User: { email: request.email },
        created_at: {
          gte: request.date.start,
          lte: request.date.end,
        },
      },
      orderBy: { created_at: 'desc' },
    });

    return activities;
  }
}
