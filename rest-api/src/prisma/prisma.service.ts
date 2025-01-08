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
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
