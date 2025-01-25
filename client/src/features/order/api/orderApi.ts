import { storeApi } from "@/store/api/storeApi";
import { UpdateOrderItemType } from "@/utils/types/order-item.type";
import {
  CreateOrderType,
  OrderType,
  OrderStatusType,
} from "@/utils/types/order.type";
import { IdType } from "@/utils/types/query.type";

const orderApi = storeApi.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation<any, CreateOrderType>({
      query: (body) => ({
        url: "order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    getOrders: builder.query<OrderType[], void>({
      query: () => "order",
      providesTags: ["Order"],
    }),
    getMyOrders: builder.query<OrderType[], void>({
      query: () => "order/myOrders",
      providesTags: ["Order"],
    }),
    getOrderById: builder.query<OrderType, IdType>({
      query: ({ id }) => `order/${id}`,
      providesTags(_result, _error, arg, _meta) {
        return [{ type: "Order", orderId: arg.id }];
      },
    }),
    updateOrderStatus: builder.mutation<any, IdType & OrderStatusType>({
      query: ({ id, status }) => ({
        url: `order/updateStatus/${id}?status=${status}`,
        method: "PATCH",
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [{ type: "Order", orderId: arg.id }];
      },
    }),
    updateOrderItem: builder.mutation<
      any,
      UpdateOrderItemType & { orderId: number }
    >({
      query: ({ id, ...rest }) => ({
        url: `order-item/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [
          { type: "Order", orderId: arg.orderId },
          { type: "OrderItem", orderItemId: arg.id },
        ];
      },
    }),
    deleteOrder: builder.mutation<any, IdType>({
      query: ({ id }) => ({
        url: `order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [{ type: "Order", orderId: arg.id }];
      },
    }),
    deleteOrderItem: builder.mutation<any, IdType & { orderId: number }>({
      query: ({ id }) => ({
        url: `order-item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags(_result, _error, arg, _meta) {
        return [
          { type: "Order", orderId: arg.orderId },
          { type: "OrderItem", orderItemId: arg.id },
        ];
      },
    }),
  }),
});

export const {
  useAddOrderMutation,
  useDeleteOrderItemMutation,
  useDeleteOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useGetOrdersQuery,
  useUpdateOrderItemMutation,
  useUpdateOrderStatusMutation,
} = orderApi;
