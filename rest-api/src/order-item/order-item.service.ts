import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodService } from 'src/food/food.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class OrderItemService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly foodService: FoodService,

    @Inject(forwardRef(() => OrderService))
    private readonly orderService: OrderService,
  ) {}

  async createOrderItems(createOrderItemDtos: CreateOrderItemDto[]) {
    const createOrderItems = await Promise.all(
      createOrderItemDtos.map(async (orderItem) => {
        const { quantity, foodId } = orderItem;
        const food = await this.foodService.findOne(foodId);
        const price = quantity * food.price;

        return {
          ...orderItem,
          price,
        };
      }),
    );

    return createOrderItems;
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    const { quantity } = updateOrderItemDto;

    const orderItem = await this.prismaService.orderItems.findUnique({
      where: {
        orderItemId: id,
      },
    });

    const order = await this.orderService.findOneByIdAndStatus(
      orderItem.orderId,
      1,
    );
    const food = await this.foodService.findOne(orderItem.foodId);

    if (!order) {
      throw new BadRequestException(
        "A rendelést csak a 'Rendelés leadva' állapotban lehet módosítani!",
      );
    }

    const oldPrice = orderItem.price;
    const newPrice = food.price * quantity;

    await this.prismaService.orderItems.update({
      where: {
        orderItemId: id,
      },
      data: {
        quantity,
        price: newPrice,
      },
    });

    const calcOrderTotalPrice = order.totalPrice - oldPrice + newPrice;

    await this.prismaService.orders.update({
      where: {
        orderId: order.orderId,
      },
      data: {
        totalPrice: calcOrderTotalPrice,
      },
    });

    return {
      success: true,
    };
  }

  async remove(id: number) {
    const orderItem = await this.prismaService.orderItems.findUnique({
      where: {
        orderItemId: id,
      },
    });

    const order = await this.orderService.findOneByIdAndStatus(
      orderItem.orderId,
      1,
    );

    if (!order) {
      throw new BadRequestException(
        "A rendelést csak a 'Rendelés leadva' állapotban lehet törölni!",
      );
    }

    const deletedOrderItem = await this.prismaService.orderItems.delete({
      where: {
        orderItemId: id,
      },
    });

    const newPrice = order.totalPrice - deletedOrderItem.price;

    if (order.orderItems.length === 1) {
      await this.prismaService.orders.delete({
        where: {
          orderId: orderItem.orderId,
        },
      });
    } else {
      await this.prismaService.orders.update({
        where: {
          orderId: orderItem.orderId,
        },
        data: {
          totalPrice: newPrice,
        },
      });
    }

    return {
      success: true,
    };
  }
}
