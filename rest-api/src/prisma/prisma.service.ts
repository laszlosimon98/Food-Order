import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      omit: {
        users: {
          createdAt: true,
          updatedAt: true,
        },
        categories: {
          createdAt: true,
          updatedAt: true,
        },
        foods: {
          createdAt: true,
          updatedAt: true,
        },
        deliveryStatus: {
          createdAt: true,
          updatedAt: true,
        },
        orderItems: {
          createdAt: true,
          updatedAt: true,
        },
        orders: {
          createdAt: true,
          updatedAt: true,
        },
        promotions: {
          createdAt: true,
          updatedAt: true,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
