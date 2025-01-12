import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [FoodController],
  providers: [FoodService],
  exports: [FoodService],
  imports: [PrismaModule, UserModule],
})
export class FoodModule {}
