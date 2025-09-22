import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/modules/user/users.controller';
import { UserService } from '../../src/modules/user/user.service';
import { UserDto } from '../../src/modules/user/dto/user.dto';
import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let service: jest.Mocked<UserService>;

  beforeEach(async () => {
    service = {
      createUser: jest.fn(),
      getUser: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: service }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  describe('createUser', () => {
    it('should create and return user', async () => {
      const req: UserDto = { email: 'a@b.com', name: 'Alice' };
      const user = { ...req, id: '1', created_at: new Date() };
      service.createUser.mockResolvedValue(user as any);

      const result = await controller.createUser(req);

      expect(service.createUser).toHaveBeenCalledWith(req);
      expect(result).toBe(user);
    });

    it('should throw if service throws', async () => {
      const req: UserDto = { email: 'a@b.com', name: 'Alice' };
      service.createUser.mockRejectedValue(new UnprocessableEntityException());

      await expect(controller.createUser(req)).rejects.toBeInstanceOf(
        UnprocessableEntityException,
      );
    });
  });

  describe('findUserById', () => {
    it('should return user if found', async () => {
      const user = { id: '1', email: 'a@b.com', name: 'Alice' };
      service.getUser.mockResolvedValue(user as any);

      const result = await controller.findUserById('a@b.com');

      expect(service.getUser).toHaveBeenCalledWith({ email: 'a@b.com' });
      expect(result).toBe(user);
    });

    it('should throw NotFoundException if not found', async () => {
      service.getUser.mockRejectedValue(new NotFoundException());

      await expect(
        controller.findUserById('missing@b.com'),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
