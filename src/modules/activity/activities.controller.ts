import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { CreateActivityRequestDto } from './dto/create-activity.request.dto';
import { ActivityDto } from './dto/activity.dto';
import { ActivityService } from './activity.service';
import { ApiTags } from '@nestjs/swagger';
import { GetUserActivitiesRequestDto } from './dto/get-user-activities.request.dto';
import { GetUserActivitiesResponseDto } from './dto/user-activities.response.dto';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  async createActivity(
    @Body() request: CreateActivityRequestDto,
  ): Promise<ActivityDto> {
    const activity = await this.activityService.createActivity(request);

    return activity;
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getUserActivities(
    @Query() request: GetUserActivitiesRequestDto,
  ): Promise<GetUserActivitiesResponseDto> {
    const userActivities =
      await this.activityService.getUserActivities(request);

    return userActivities;
  }
}
