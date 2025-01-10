import { forwardRef, Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FoodModule } from 'src/food/food.module';
import { OrderModule } from 'src/order/order.module';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService],
  exports: [OrderItemService],
  imports: [PrismaModule, FoodModule, forwardRef(() => OrderModule)],
})
export class OrderItemModule {}
