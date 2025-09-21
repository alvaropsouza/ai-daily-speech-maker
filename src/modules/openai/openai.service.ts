import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private client: OpenAI;

  constructor(private configService: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.configService.get<string>('openApiKey'),
    });
  }

  async chat(
    messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
  ) {
    const res = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.3,
    });
    return res.choices[0]?.message?.content ?? '';
  }
}
