import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { Logger } from '../../config/logger/logger.config';

@Injectable()
export class OpenAiService {
  private client: OpenAI;
  private logger: Logger = new Logger(OpenAiService.name);

  constructor(private readonly configService: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.configService.get<string>('openApiKey'),
    });
  }

  async chat(
    messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
  ): Promise<string> {
    try {
      this.logger.log(`Sending messages to OpenAI`);

      const res = await this.client.chat.completions.create({
        model: 'gpt-4.1',
        messages,
        temperature: 0.3,
      });

      const content = res?.choices?.[0]?.message?.content;

      this.logger.log(`Received response from OpenAI: ${content}`);

      return content ?? '';
    } catch (error) {
      this.logger.error(`Error during OpenAI chat completion: ${error}`);

      throw new BadGatewayException('Error communicating with OpenAI');
    }
  }
}
