import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.users.upsert({
    where: { userId: 1 },
    update: {},
    create: {
      username: 'admin',
      fullname: 'admin',
      password: await bcrypt.hash('admin', parseInt(process.env.HASHROUND)),
      refreshToken: null,
      role: 'admin',
    },
  });

  await prisma.users.upsert({
    where: { userId: 2 },
    update: {},
    create: {
      username: 'employee',
      fullname: 'employee',
      password: await bcrypt.hash('employee', parseInt(process.env.HASHROUND)),
      refreshToken: null,
      role: 'employee',
    },
  });

  await prisma.users.upsert({
    where: { userId: 3 },
    update: {},
    create: {
      username: 'user',
      fullname: 'user',
      password: await bcrypt.hash('user', parseInt(process.env.HASHROUND)),
      refreshToken: null,
      role: 'user',
    },
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
