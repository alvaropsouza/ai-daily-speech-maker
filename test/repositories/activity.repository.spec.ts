import { randomUUID } from 'crypto';
import { Activity } from '@prisma/client';
import { ActivityRepository } from '../../src/modules/activity/activity.repository';

describe('ActivityRepository', () => {
  let repo: ActivityRepository;
  const prismaMock = {
    activity: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  } as any;

  beforeAll(() => {
    repo = new ActivityRepository(prismaMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe('insertActivity', () => {
    it('should create an activity with expected payload and return it', async () => {
      const fixedDate = new Date('2024-01-01T00:00:00.000Z');
      jest.useFakeTimers().setSystemTime(fixedDate);

      const mockActivity: Activity = {
        content: 'Did something great',
        created_at: fixedDate,
        email: 'test@email.com',
        id: randomUUID(),
        updated_at: fixedDate,
      };

      prismaMock.activity.create.mockResolvedValue(mockActivity);

      const input: any = {
        content: 'Did something great',
        User: { connect: { email: 'test@example.com' } },
      };

      const result = await repo.insertActivity(input);

      expect(prismaMock.activity.create).toHaveBeenCalledTimes(1);
      expect(prismaMock.activity.create).toHaveBeenCalledWith({
        data: {
          content: 'Did something great',
          created_at: fixedDate,
          User: { connect: { email: 'test@example.com' } },
        },
      });
      expect(result).toBe(mockActivity);
    });
  });

  describe('findUserActivitiesByDate', () => {
    it('should query activities with correct filters and ordering', async () => {
      const activities: Activity[] = [
        {
          content: 'Did something great',
          created_at: new Date('2024-01-02T10:00:00.000Z'),
          email: 'test@email.com',
          id: randomUUID(),
          updated_at: new Date('2024-01-02T10:00:00.000Z'),
        },
      ];
      prismaMock.activity.findMany.mockResolvedValue(activities);

      const request = {
        email: 'test@example.com',
        date: {
          start: '2024-01-01T00:00:00.000Z',
          end: '2024-01-03T00:00:00.000Z',
        },
      };

      const result = await repo.findUserActivitiesByDate(request);

      expect(prismaMock.activity.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.activity.findMany).toHaveBeenCalledWith({
        where: {
          User: { email: 'test@example.com' },
          created_at: {
            gte: '2024-01-01T00:00:00.000Z',
            lte: '2024-01-03T00:00:00.000Z',
          },
        },
        orderBy: { created_at: 'desc' },
      });
      expect(result).toBe(activities);
    });

    it('should return empty array when no activities found', async () => {
      prismaMock.activity.findMany.mockResolvedValue([]);

      const result = await repo.findUserActivitiesByDate({
        email: 'none@example.com',
        date: {
          start: '2024-01-01T00:00:00.000Z',
          end: '2024-01-01T23:59:59.999Z',
        },
      });

      expect(result).toEqual([]);
    });
  });
});
