import { OrderItemType } from "@/utils/types/order-item.type";

export type CreateOrderType = {
  quantity: number;
  foodId: number;
};

export type OrderType = {
  id: number;
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
