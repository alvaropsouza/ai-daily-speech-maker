import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from '../src/modules/health-check/health-check.controller';
import { HealthCheckService } from 'src/modules/health-check/health-check.service';

describe('HealthCheckController', () => {
  let appController: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [HealthCheckService],
    }).compile();

    appController = app.get<HealthCheckController>(HealthCheckController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHealthCheck()).toBe('Hello World!');
    });
  });
});
