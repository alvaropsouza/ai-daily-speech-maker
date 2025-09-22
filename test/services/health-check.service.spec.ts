import { HealthCheckService } from '../../src/modules/health-check/health-check.service';

describe('HealthCheckService', () => {
  let service: HealthCheckService;

  beforeEach(() => {
    service = new HealthCheckService();
  });

  it('should return a healthy response with correct shape', () => {
    const result = service.getHealthCheck();
    expect(result).toHaveProperty('healthy', true);
    expect(result).toHaveProperty('timestamp');
    expect(result).toHaveProperty('message', 'Service is running smoothly');
    expect(result).toHaveProperty('version', 'version');
    expect(typeof result.timestamp).toBe('string');
  });
});
