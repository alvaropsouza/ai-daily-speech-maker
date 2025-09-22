import { Module } from '@nestjs/common';
import {
  ActivityModule,
  UserModule,
  HealthCheckModule,
  OpenAiModule,
} from '../modules';

@Module({
  imports: [ActivityModule, HealthCheckModule, OpenAiModule, UserModule],
})
export class AppModule {}
