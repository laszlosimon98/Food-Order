import { useGetCurrentUserQuery } from "@/features/auth/api/authApi";
import {
  useDeleteOrderItemMutation,
  useDeleteOrderMutation,
  useGetMyOrdersQuery,
  useUpdateOrderItemMutation,
} from "@/features/order/api/orderApi";
import OrderInput from "@/features/order/components/OrderInput";
import Button from "@/features/shared/components/Button";
import Card from "@/features/shared/components/Card";
import Loading from "@/features/shared/components/Loading";
import PageTitle from "@/features/shared/components/PageTitle";
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, ReactElement, useState } from "react";

const MyOrders = (): ReactElement => {
  const { data: myOrders, isLoading: isMyOrdersLoading } =
    useGetMyOrdersQuery();

  const { data: currentUser, isLoading: isCurrentUserLoading } =
    useGetCurrentUserQuery();

  const [useDeleteOrder] = useDeleteOrderMutation();
  const [useUpdateOrderItem] = useUpdateOrderItemMutation();
  const [useDeleteOrderItem] = useDeleteOrderItemMutation();

  const [isQuantityEdit, setIsQuantityEdit] = useState<boolean>(false);
  const [newQuantity, setNewQuantity] = useState<number>(0);

  if (isMyOrdersLoading || isCurrentUserLoading) {
    return <Loading />;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value);
    if (num > 0) {
      setNewQuantity(num);
    }
  };

  return (
    <>
      <PageTitle>Rendeléseim</PageTitle>
      <section className="flex justify-center items-center flex-col">
        <Card className="p-8">
          {myOrders?.map((order) => (
            <section key={order.orderId}>
              <div>Név: {order.fullname}</div>
              <div>Cím: {order.address}</div>
              <div>Telefonszám: {order.phoneNumber}</div>
              <div>Ár: {order.totalOrderPrice} Ft</div>
              <div>Rendelés állapota: {order.deliveryStatus.statusName}</div>
              <div>Tételek: </div>
              {order.orderItems.map((item) => (
                <div
                  key={item.orderItemId}
                  className="py-3 flex justify-between items-center"
                >
                  <section>
                    <div>Étel: {item.foods.name}</div>
                    <div className="flex justify-start gap-2">
                      <div>Mennyiség:</div>
                      <div>
                        {!isQuantityEdit ? (
                          item.quantity
                        ) : (
                          <OrderInput
                            value={item.quantity}
                            onChange={(e) =>
                              handleChange(e as ChangeEvent<HTMLInputElement>)
                            }
                          />
                        )}
                      </div>
                    </div>
                    <div>Ár: {item.totalPrice} Ft</div>
                  </section>

                  <div className="flex justify-between w-24">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => {
                        if (!isQuantityEdit) {
                          setIsQuantityEdit(true);
                        } else {
                          useUpdateOrderItem({
                            id: item.orderItemId,
                            quantity: newQuantity,
                            orderId: order.orderId,
                          });
                          setIsQuantityEdit(false);
                        }
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() =>
                        useDeleteOrderItem({
                          id: item.orderItemId,
                          orderId: order.orderId,
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faClose} />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex justify-center pt-3">
                {currentUser.userId === order.userId &&
                  (!isQuantityEdit ? (
                    <Button
                      variant="secondary"
                      onClick={() => useDeleteOrder({ id: order.orderId })}
                    >
                      Rendelés Törlés
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={() => setIsQuantityEdit(false)}
                    >
                      Mégse
                    </Button>
                  ))}
              </div>
            </section>
          ))}
        </Card>
      </section>
    </>
  );
};

export default MyOrders;
