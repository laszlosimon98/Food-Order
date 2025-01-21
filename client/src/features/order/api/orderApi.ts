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
      providesTags: ["Order"],
    }),
    deleteOrder: builder.mutation<any, IdType>({
      query: ({ id }) => ({
        url: `order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrderStatus: builder.mutation<any, IdType & OrderStatusType>({
      query: ({ id, status }) => ({
        url: `order/updateStatus/${id}?status=${status}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrderItem: builder.mutation<any, UpdateOrderItemType>({
      query: ({ id, ...rest }) => ({
        url: `order-item/${id}`,
        method: "POST",
        body: rest,
      }),
      invalidatesTags: ["OrderItem"],
    }),
    deleteOrderItem: builder.mutation<any, IdType>({
      query: ({ id }) => ({
        url: `order-item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["OrderItem"],
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
