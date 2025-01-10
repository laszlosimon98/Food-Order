import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderItemModule } from 'src/order-item/order-item.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
  imports: [PrismaModule, forwardRef(() => OrderItemModule)],
})
export class OrderModule {}
