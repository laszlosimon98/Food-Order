import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

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

const createDeliveryStatus = async () => {
  const deliveryStatus = [
    'Rendelés leadva',
    'Feldolgozás alatt',
    'Szállítás alatt',
    'Teljesítve',
  ];

  for (const status of deliveryStatus) {
    await prisma.deliveryStatus.create({
      data: {
        statusName: status,
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
    2: ['Húsleves', 'Zöldségleves', 'Borsóleves'],
    3: ['Kóla', 'Sprite', 'Fanta'],
    4: ['Hasábburgonya', 'Rizs'],
    5: ['Kirántott Csirkemell', 'Kirántott Csirkecomb', 'Steak', 'Sült kacsa'],
  };

  Object.keys(foods).forEach(async (key) => {
    const currentFoods = foods[key];

    for (const food of currentFoods) {
      await prisma.foods.create({
        data: {
          name: food,
          description: '',
          price: faker.number.int({ min: 500, max: 2500, multipleOf: 10 }),
          isSpice: Math.random() < 0.5,
          isVegetarian: Math.random() < 0.5,
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
  await createDeliveryStatus();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
