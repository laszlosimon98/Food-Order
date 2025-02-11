import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { fromZonedTime } from 'date-fns-tz';
import { PrismaService } from 'src/prisma/prisma.service';
import { PromotionService } from 'src/promotion/promotion.service';

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
  private now: Date;
  constructor(
    private readonly prismaService: PrismaService,
    private readonly promotionService: PromotionService,
  ) {}

  // @Cron(CronExpression.EVERY_HOUR)
  @Cron(CronExpression.EVERY_MINUTE)
  // @Cron("0 8 * * *") Minden nap 8:00-kor
  async handleExpirationCron() {
    const now = fromZonedTime(new Date(), 'Europe/Budapest');
    const expiredPromotions = await this.promotionService.findAll({
      isActive: true,
      endDate: {
        lte: now,
      },
    });

    const expiredPromotionIds = expiredPromotions.map(
      (promotion) => promotion.promotionId,
    );

    await this.prismaService.promotions.updateMany({
      where: {
        promotionId: {
          in: expiredPromotionIds,
        },
      },
      data: {
        isActive: false,
      },
    });
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async handleScheduledPromotions() {
    const now = fromZonedTime(new Date(), 'Europe/Budapest');
    const scheduledPromotions = await this.promotionService.findAll({
      isActive: false,
      startDate: {
        lte: now,
      },
      endDate: {
        gt: now,
      },
    });

    const scheduledPromotionIds = scheduledPromotions.map(
      (promotion) => promotion.promotionId,
    );

    await this.prismaService.promotions.updateMany({
      where: {
        promotionId: {
          in: scheduledPromotionIds,
        },
      },
      data: {
        isActive: true,
      },
    });
  }
}
