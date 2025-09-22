import { OpenAiService } from '../../src/modules/openai/openai.service';
import { ConfigService } from '@nestjs/config';

jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  }));
});

import OpenAI from 'openai';

describe('OpenAiService', () => {
  let service: OpenAiService;
  let mockCreate: jest.Mock;

  beforeEach(() => {
    const cfg = {
      get: jest.fn().mockReturnValue('API_KEY_123'),
    } as any as ConfigService;
    service = new OpenAiService(cfg);

    const openAiMockClass = OpenAI as unknown as jest.Mock;
    const instance = openAiMockClass.mock.results.at(-1)!.value;
    mockCreate = instance.chat.completions.create as jest.Mock;
    mockCreate.mockClear();
  });

  it('uses api key from config', () => {
    expect((OpenAI as any).mock.calls[0][0]).toEqual({ apiKey: 'API_KEY_123' });
  });

  it('returns first message content', async () => {
    mockCreate.mockResolvedValueOnce({
      choices: [{ message: { content: 'Hello world' } }],
    });

    const out = await service.chat([{ role: 'user', content: 'Hi' }]);

    expect(mockCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        model: 'gpt-4o-mini',
        temperature: 0.3,
      }),
    );
    expect(out).toBe('Hello world');
  });

  it('returns empty string when no message', async () => {
    mockCreate.mockResolvedValueOnce({ choices: [] });

    const out = await service.chat([{ role: 'user', content: 'Hi' }]);

    expect(out).toBe('');
  });

  it('handles undefined response gracefully', async () => {
    mockCreate.mockResolvedValueOnce(undefined);

    const out = await service.chat([{ role: 'user', content: 'Hi' }]);

    expect(out).toBe('');
  });
});
