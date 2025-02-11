import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FoodModule } from 'src/food/food.module';

@Module({
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService],
  imports: [PrismaModule, FoodModule],
})
export class PromotionModule {}
