import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

// @Cron()
// *    *    *    *    *
// |    |    |    |    |
// |    |    |    |    +---- hét napja (0 - 6) (vasárnap = 0)
// |    |    |    +--------- hónap (1 - 12)
// |    |    +------------ hónap napja (1 - 31)
// |    +------------- óra (0 - 23)
// +------------- perc (0 - 59)

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}

  // @Cron(CronExpression.EVERY_HOUR)
  @Cron(CronExpression.EVERY_MINUTE)
  // @Cron("0 8 * * *") Minden nap 8:00-kor
  async handlePromotionCron() {
    const expiredPromotions = await this.prismaService.promotions.findMany({
      where: {
        isActive: true,
        endDate: {
          lte: new Date(),
        },
      },
    });

    const expiredPromotionsIds = expiredPromotions.map(
      (promotion) => promotion.promotionId,
    );

    for (const expiredPromotionId of expiredPromotionsIds) {
      await this.prismaService.promotions.update({
        where: {
          promotionId: expiredPromotionId,
        },
        data: {
          isActive: false,
        },
      });
    }
  }
}
