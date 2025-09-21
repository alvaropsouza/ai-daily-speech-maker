import { Module } from '@nestjs/common';
import { OpenAiService } from './openai.service';
import { ConfigModule } from '@nestjs/config';
import envs from 'src/config/envs.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [envs],
    }),
  ],
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class OpenAiModule {}
