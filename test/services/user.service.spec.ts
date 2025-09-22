import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/modules/user/user.service';
import { UserRepository } from '../../src/modules/user/user.repository';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let repo: {
    findUser: jest.Mock;
    createUser: jest.Mock;
  };

  beforeEach(async () => {
    repo = {
      findUser: jest.fn(),
      createUser: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: repo,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('creates a new user when not existing', async () => {
      const dto = { email: 'a@b.com', name: 'Alice' };
      repo.findUser.mockResolvedValue(null);
      const created = { id: '1', ...dto, created_at: new Date() };
      repo.createUser.mockResolvedValue(created);

      const result = await service.createUser(dto as any);

      expect(repo.findUser).toHaveBeenCalledWith({ email: dto.email });
      expect(repo.createUser).toHaveBeenCalledWith({
        email: dto.email,
        name: dto.name,
      });
      expect(result).toBe(created);
    });

    it('throws when user already exists', async () => {
      const dto = { email: 'a@b.com', name: 'Alice' };
      repo.findUser.mockResolvedValue({ id: '1', ...dto });

      await expect(service.createUser(dto as any)).rejects.toBeInstanceOf(
        UnprocessableEntityException,
      );
      expect(repo.createUser).not.toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('returns user when found', async () => {
      const user = { id: '1', email: 'a@b.com', name: 'Alice' };
      repo.findUser.mockResolvedValue(user);

      const result = await service.getUser({ email: user.email });

      expect(repo.findUser).toHaveBeenCalledWith({ email: user.email });
      expect(result).toBe(user);
    });

    it('throws NotFoundException when user missing', async () => {
      repo.findUser.mockResolvedValue(null);

      await expect(
        service.getUser({ email: 'missing@b.com' }),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
