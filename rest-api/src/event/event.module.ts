import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PromotionModule } from 'src/promotion/promotion.module';

@Module({
  providers: [EventService],
  imports: [PrismaModule, PromotionModule],
})
export class EventModule {}
