import { randomUUID } from 'crypto';
import { activitiesPrompt } from './activities.prompt';
import { Activity } from '@prisma/client';

describe('activitiesPrompt', () => {
  it('should return a prompt with empty activities', () => {
    const activities: Activity[] = [];
    const result = activitiesPrompt(activities);
    expect(result.getActivitiesSummaryPrompt.role).toBe('system');
    expect(result.getActivitiesSummaryPrompt.content).toContain(
      'Atividades realizadas: []',
    );
  });

  it('should return a prompt with a single activity', () => {
    const activities: Activity[] = [
      {
        content: 'test-content',
        created_at: new Date(),
        email: 'test@emasil.com',
        id: randomUUID(),
        updated_at: new Date(),
      },
    ];
    const result = activitiesPrompt(activities);

    expect(result.getActivitiesSummaryPrompt.content).toContain(
      'Atividades realizadas:',
    );
  });

  it('should return a prompt with multiple activities', () => {
    const activities: Activity[] = [
      {
        content: 'test-content',
        created_at: new Date(),
        email: 'test@emasil.com',
        id: randomUUID(),
        updated_at: new Date(),
      },
      {
        content: 'test-content 2',
        created_at: new Date(),
        email: 'test@emasil.com',
        id: randomUUID(),
        updated_at: new Date(),
      },
    ];
    const result = activitiesPrompt(activities);
    expect(result.getActivitiesSummaryPrompt.content).toContain(
      'Atividades realizadas:',
    );
  });

  it('should include instructions about impedimentos', () => {
    const activities: Activity[] = [];
    const result = activitiesPrompt(activities);
    expect(result.getActivitiesSummaryPrompt.content).toMatch(
      /sem impedimentos|com impedimentos/,
    );
  });
});
