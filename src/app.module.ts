import { Module } from '@nestjs/common';
import { ActivityModule } from './modules/activity/activity.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { OpenAiModule } from './modules/openai/openai.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ActivityModule, HealthCheckModule, OpenAiModule, UserModule],
})
export class AppModule {}
