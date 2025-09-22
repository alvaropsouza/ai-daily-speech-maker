import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesController } from '../../src/modules/activity/activities.controller';
import { ActivityService } from '../../src/modules/activity/activity.service';
import { ActivityDto } from '../../src/modules/activity/dto/activity.dto';
import { CreateActivityRequestDto } from '../../src/modules/activity/dto/create-activity.request.dto';
import { GetUserActivitiesResponseDto } from '../../src/modules/activity/dto/user-activities.response.dto';

describe('ActivitiesController', () => {
  let controller: ActivitiesController;
  let service: jest.Mocked<ActivityService>;

  beforeEach(async () => {
    const serviceMock: jest.Mocked<ActivityService> = {
      createActivity: jest.fn(),
      getUserActivities: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivitiesController],
      providers: [
        {
          provide: ActivityService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get(ActivitiesController);
    service = module.get(ActivityService);
  });

  describe('createActivity', () => {
    it('should call service and return activity', async () => {
      const req = {
        content: 'Did stuff',
        email: 'a@b.com',
      } as CreateActivityRequestDto;
      const resp: ActivityDto = {
        id: '1',
        content: 'Did stuff',
        email: 'a@b.com',
        created_at: new Date(),
        updated_at: null,
      };

      service.createActivity.mockResolvedValue(resp);

      const result = await controller.createActivity(req);

      expect(service.createActivity).toHaveBeenCalledWith(req);
      expect(result).toBe(resp);
    });
  });

  describe('getUserActivities', () => {
    it('should call service and return activities response', async () => {
      const req = { email: 'a@b.com', date: '2025-09-21' } as any;
      const resp: GetUserActivitiesResponseDto = {
        activities: [
          {
            id: '1',
            content: 'X',
            email: 'a@b.com',
            created_at: new Date(),
            updated_at: null,
          },
        ],
        summary: 'Summary',
        email: 'a@b.com',
      };

      service.getUserActivities.mockResolvedValue(resp);

      const result = await controller.getUserActivities(req);

      expect(service.getUserActivities).toHaveBeenCalledWith(req);
      expect(result).toBe(resp);
    });

    it('should work when date not provided', async () => {
      const req = { email: 'a@b.com' } as any;
      const resp = { activities: [], summary: 'Empty', email: 'a@b.com' };
      service.getUserActivities.mockResolvedValue(resp as any);

      const result = await controller.getUserActivities(req);

      expect(service.getUserActivities).toHaveBeenCalledWith(req);
      expect(result).toBe(resp);
    });
  });
});
