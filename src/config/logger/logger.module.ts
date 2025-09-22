import { Module } from '@nestjs/common';
import { Logger } from './logger.config';

@Module({
  providers: [Logger],
  exports: [Logger],
})
export class LoggerModule {}
