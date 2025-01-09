import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PromotionController],
  providers: [PromotionService],
  imports: [PrismaModule],
})
export class PromotionModule {}
