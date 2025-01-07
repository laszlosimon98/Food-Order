import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.user.upsert({
    where: { user_id: 1 },
    update: {},
    create: {
      username: 'admin',
      fullname: 'admin',
      password: await bcrypt.hash('admin', parseInt(process.env.HASHROUND)),
      refreshToken: '',
      role: 'admin',
    },
  });

  await prisma.user.upsert({
    where: { user_id: 2 },
    update: {},
    create: {
      username: 'employee',
      fullname: 'employee',
      password: await bcrypt.hash('employee', parseInt(process.env.HASHROUND)),
      refreshToken: '',
      role: 'employee',
    },
  });

  await prisma.user.upsert({
    where: { user_id: 3 },
    update: {},
    create: {
      username: 'user',
      fullname: 'user',
      password: await bcrypt.hash('user', parseInt(process.env.HASHROUND)),
      refreshToken: '',
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
