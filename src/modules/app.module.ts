import { Module } from '@nestjs/common';
import {
  ActivityModule,
  UserModule,
  HealthCheckModule,
  OpenAiModule,
} from '../modules';
import { LoggerModule } from 'src/config/logger/logger.module';

@Module({
  imports: [
    ActivityModule,
    HealthCheckModule,
    OpenAiModule,
    UserModule,
    LoggerModule,
  ],
})
export class AppModule {}
