import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from '../../src/modules/health-check/health-check.controller';
import { HealthCheckService } from '../../src/modules/health-check/health-check.service';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;
  let service: HealthCheckService;

  beforeEach(async () => {
    const serviceMock = {
      getHealthCheck: jest.fn().mockReturnValue({
        healthy: true,
        timestamp: '2025-09-21T12:00:00.000Z',
        message: 'Service is running smoothly',
        version: 'version',
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [{ provide: HealthCheckService, useValue: serviceMock }],
    }).compile();

    controller = module.get<HealthCheckController>(HealthCheckController);
    service = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health check response', () => {
    const result = controller.getHealthCheck();
    expect(service.getHealthCheck).toHaveBeenCalled();
    expect(result).toEqual({
      healthy: true,
      timestamp: '2025-09-21T12:00:00.000Z',
      message: 'Service is running smoothly',
      version: 'version',
    });
  });
});
