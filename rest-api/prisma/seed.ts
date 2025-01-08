import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const createUsers = async () => {
  const users = ['admin', 'employee', 'user'];

  for (const user of users) {
    await prisma.users.create({
      data: {
        username: user,
        fullname: user,
        password: await bcrypt.hash(user, parseInt(process.env.HASHROUND)),
        refreshToken: null,
        role: user,
      },
    });
  }
};

const createCategories = async () => {
  const categories = ['Pizza', 'Leves', 'Ital', 'Köret', 'Hús'];

  for (const category of categories) {
    await prisma.categories.create({
      data: {
        categoryName: category,
      },
    });
  }
};

const createFoods = async () => {
  const foods = {
    1: [
      'Sonkás-kukoricás Pizza',
      'Hawaii Pizza',
      'Sajtos Pizza',
      'Magyaros Pizza',
    ],
    2: ['Hús leves', 'Zöldség leves', 'Borsó Leves'],
    3: ['Kóla', 'Sprite', 'Fanta'],
    4: ['Hasáb burgonya', 'Héjas Krumpli', 'Rizs'],
    5: ['Kirántott Csirkemell', 'Kirántott Csirkecomb', 'Steak', 'Sült kacsa'],
  };

  Object.keys(foods).forEach(async (key) => {
    const currentFoods = foods[key];

    for (const food of currentFoods) {
      await prisma.foods.create({
        data: {
          name: food,
          description: '',
          price: Math.floor(Math.random() * 1800) + 200,
          isSpice: false,
          isVegetarian: false,
          categoryId: parseInt(key),
        },
      });
    }
  });
};

const main = async () => {
  await createUsers();
  await createCategories();
  await createFoods();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
