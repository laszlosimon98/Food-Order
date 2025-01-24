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
  orderId: number;
  fullname: string;
  address: string;
  phoneNumber: string;
  totalPrice: number;
  orderDate: Date;
  deliveryStatus: {
    statusId: number;
    statusName: string;
  };
  orderItems: OrderItemType;
};

export type OrderStatusType = {
  status:
    | "Rendelés leadva"
    | "Feldolgozás alatt"
    | "Szállítás alatt"
    | "Teljesítve";
};
