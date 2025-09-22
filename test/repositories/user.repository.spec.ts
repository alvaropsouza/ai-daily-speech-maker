import { UserRepository } from '../../src/modules/user/user.repository';

describe('UserRepository', () => {
  let repo: UserRepository;
  let prisma: {
    user: {
      create: jest.Mock;
      findUnique: jest.Mock;
    };
  };

  beforeEach(() => {
    prisma = {
      user: {
        create: jest.fn(),
        findUnique: jest.fn(),
      },
    } as any;

    repo = new UserRepository(prisma as any);
  });

  describe('createUser', () => {
    it('should create a user with correct data', async () => {
      const input = { email: 'a@b.com', name: 'Alice' };
      const created = { id: '1', ...input, created_at: new Date() };
      prisma.user.create.mockResolvedValue(created);

      const result = await repo.createUser(input as any);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: input.email,
          name: input.name,
          created_at: expect.any(Date),
        },
      });
      expect(result).toBe(created);
    });
  });

  describe('findUser', () => {
    it('should find user by email', async () => {
      const user = { id: '1', email: 'a@b.com', name: 'Alice' };
      prisma.user.findUnique.mockResolvedValue(user);

      const result = await repo.findUser({ email: 'a@b.com' });

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'a@b.com' },
      });
      expect(result).toBe(user);
    });

    it('should return null if user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const result = await repo.findUser({ email: 'missing@b.com' });

      expect(result).toBeNull();
    });
  });
});
