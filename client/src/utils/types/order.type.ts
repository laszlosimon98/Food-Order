import { OrderItemType } from "@/utils/types/order-item.type";

export type CreateOrderType = {
  fullname: string;
  address: string;
  phoneNumber: string;
  orderItems: CreateOrderItemType[];
};

export type CreateOrderItemType = {
  quantity: number;
  foodId: number;
};

export type OrderType = {
  userId: number;
  orderId: number;
  fullname: string;
  address: string;
  phoneNumber: string;
  totalOrderPrice: number;
  orderDate: Date;
  deliveryStatus: {
    statusId: number;
    statusName: string;
  };
  orderItems: OrderItemType[];
};

export const OrderStatus = [
  "Rendelés leadva",
  "Feldolgozás alatt",
  "Szállítás alatt",
  "Teljesítve",
] as const;

export type OrderStatusType = {
  status: (typeof OrderStatus)[number];
};

// export type OrderStatusType = {
//   status:
// };
