import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from '../../src/modules/activity/activity.service';
import { ActivityRepository } from '../../src/modules/activity/activity.repository';
import { OpenAiService } from '../../src/modules/openai/openai.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockActivityRepository = {
  findUserActivitiesByDate: jest.fn(),
  insertActivity: jest.fn(),
};

const mockOpenAiService = {
  chat: jest.fn(),
};

describe('ActivityService', () => {
  let service: ActivityService;

  beforeEach(async () => {
    jest.useFakeTimers().setSystemTime(new Date('2025-01-10T12:34:56.000Z'));

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityService,
        { provide: ActivityRepository, useValue: mockActivityRepository },
        { provide: OpenAiService, useValue: mockOpenAiService },
      ],
    }).compile();

    service = module.get<ActivityService>(ActivityService);

    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('createActivity', () => {
    it('creates a new activity when no duplicate exists', async () => {
      mockActivityRepository.findUserActivitiesByDate.mockResolvedValueOnce([
        { content: 'Different existing activity' },
      ]);
      const inserted = { id: '1', content: 'New Activity', userId: 'u1' };
      mockActivityRepository.insertActivity.mockResolvedValueOnce(inserted);

      const result = await service.createActivity({
        email: 'user@test.com',
        content: 'New Activity',
      });

      expect(
        mockActivityRepository.findUserActivitiesByDate,
      ).toHaveBeenCalledTimes(1);
      expect(mockActivityRepository.insertActivity).toHaveBeenCalledWith({
        content: 'New Activity',
        User: { connect: { email: 'user@test.com' } },
      });
      expect(result).toBe(inserted);
    });

    it('throws BadRequestException on duplicate same-day content', async () => {
      mockActivityRepository.findUserActivitiesByDate.mockResolvedValueOnce([
        { content: 'Repeat Activity' },
      ]);

      await expect(
        service.createActivity({
          email: 'user@test.com',
          content: 'Repeat Activity',
        }),
      ).rejects.toBeInstanceOf(BadRequestException);

      expect(mockActivityRepository.insertActivity).not.toHaveBeenCalled();
    });
  });

  describe('getUserActivities', () => {
    it('throws NotFoundException when no activities', async () => {
      mockActivityRepository.findUserActivitiesByDate.mockResolvedValueOnce([]);

      await expect(
        service.getUserActivities({
          email: 'user@test.com',
          date: '2024-01-15',
        }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it('returns summary and activities when found', async () => {
      const activities = [
        { id: 'a1', content: 'Did workout' },
        { id: 'a2', content: 'Read a book' },
      ];
      mockActivityRepository.findUserActivitiesByDate.mockResolvedValueOnce(
        activities,
      );
      mockOpenAiService.chat.mockResolvedValueOnce('Summary text');

      const res = await service.getUserActivities({
        email: 'user@test.com',
        date: '2024-01-15',
      });

      expect(
        mockActivityRepository.findUserActivitiesByDate,
      ).toHaveBeenCalledWith({
        date: {
          start: '2024-01-15T00:00:00.000Z',
          end: '2024-01-15T23:59:59.999Z',
        },
        email: 'user@test.com',
      });
      expect(mockOpenAiService.chat).toHaveBeenCalledTimes(1);
      const chatArg = mockOpenAiService.chat.mock.calls[0][0];
      expect(Array.isArray(chatArg)).toBe(true);
      expect(chatArg).toHaveLength(1);
      expect(res).toEqual({
        email: 'user@test.com',
        summary: 'Summary text',
        activities,
      });
    });
  });

  describe('getDayRange (indirect validation via repository call)', () => {
    it('computes today range when date omitted', async () => {
      mockActivityRepository.findUserActivitiesByDate.mockResolvedValueOnce([
        { id: 'a1', content: 'X' },
      ]);
      mockOpenAiService.chat.mockResolvedValueOnce('S');

      await service.getUserActivities({
        email: 'user@test.com',
        date: undefined,
      } as any);

      const call =
        mockActivityRepository.findUserActivitiesByDate.mock.calls[0][0];
      expect(call.date.start.startsWith('2025-01-10T00:00:00.000Z')).toBe(true);
      expect(call.date.end.startsWith('2025-01-10T23:59:59.999Z')).toBe(true);
    });
  });
});
