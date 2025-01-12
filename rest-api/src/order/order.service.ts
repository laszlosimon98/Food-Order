import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderItemService } from 'src/order-item/order-item.service';
import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';
import { StatusEnum } from 'src/enums/status';

@Injectable()
export class OrderService {
  constructor(
    private readonly prismaService: PrismaService,

    @Inject(forwardRef(() => OrderItemService))
    private readonly orderItemService: OrderItemService,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto[], user: any) {
    const order = await this.prismaService.orders.create({
      data: {
        orderDate: new Date(),
        totalPrice: 0,
        deliveryStatusId: 1,
        userId: user.userId,
      },
    });

    const orderItems =
      await this.orderItemService.createOrderItems(createOrderItemDto);

    const createOrderItems = orderItems.map((orderItem) => {
      return {
        ...orderItem,
        orderId: order.orderId,
      };
    });

    await this.prismaService.orderItems.createMany({
      data: createOrderItems,
    });

    const totalPrice = orderItems.reduce(
      (prev, current) => prev + current.price,
      0,
    );

    await this.prismaService.orders.update({
      where: {
        orderId: order.orderId,
      },
      data: {
        totalPrice,
      },
    });

    return {
      success: true,
    };
  }

  async findAll() {
    return await this.prismaService.orders.findMany({
      include: {
        deliveryStatus: true,
        orderItems: {
          include: {
            foods: {
              include: {
                categories: true,
              },
              omit: {
                categoryId: true,
              },
            },
          },
          omit: {
            foodId: true,
            orderId: true,
          },
        },
      },
      omit: {
        userId: true,
        deliveryStatusId: true,
      },
    });
  }

  async findMyOrders(user: any) {
    return await this.prismaService.orders.findMany({
      where: {
        orderId: user.orderId,
      },
      include: {
        deliveryStatus: true,
        orderItems: {
          include: {
            foods: {
              include: {
                categories: true,
              },
              omit: {
                categoryId: true,
              },
            },
          },
          omit: {
            foodId: true,
            orderId: true,
          },
        },
      },
      omit: {
        userId: true,
        deliveryStatusId: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.orders.findUnique({
      where: {
        orderId: id,
      },
      include: {
        deliveryStatus: true,
        orderItems: {
          include: {
            foods: {
              include: {
                categories: true,
              },
              omit: {
                categoryId: true,
              },
            },
          },
          omit: {
            foodId: true,
            orderId: true,
          },
        },
      },
      omit: {
        userId: true,
        deliveryStatusId: true,
      },
    });
  }

  async findOneByIdAndStatus(id: number, statusId: number) {
    return await this.prismaService.orders.findUnique({
      where: {
        orderId: id,
        deliveryStatusId: statusId,
      },
      include: {
        orderItems: true,
      },
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async updateStatus(id: number, status: StatusEnum) {
    const { statusId } = await this.prismaService.deliveryStatus.findUnique({
      where: {
        statusName: status,
      },
    });

    await this.prismaService.orders.update({
      where: {
        orderId: id,
      },
      data: {
        deliveryStatusId: statusId,
      },
    });

    return {
      success: true,
    };
  }

  async remove(id: number) {
    const order = await this.prismaService.orders.findUnique({
      where: {
        orderId: id,
        deliveryStatusId: 1,
      },
    });

    if (!order) {
      throw new NotFoundException(
        "A rendelést csak a 'Rendelés leadva' állapotban lehet törölni!",
      );
    }

    await this.prismaService.orders.delete({
      where: {
        orderId: id,
        deliveryStatusId: 1,
      },
    });

    return {
      success: true,
    };
  }
}
