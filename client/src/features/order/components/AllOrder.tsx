import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/features/order/api/orderApi";
import Button from "@/features/shared/components/Button";
import Card from "@/features/shared/components/Card";
import Loading from "@/features/shared/components/Loading";
import PageTitle from "@/features/shared/components/PageTitle";
import Properties from "@/features/shared/components/Properties";
import { convertDate } from "@/utils/convertDate";
import { OrderStatus } from "@/utils/types/order.type";
import { ReactElement, useState } from "react";

type AllOrderProps = {};

const AllOrder = ({}: AllOrderProps): ReactElement => {
  const { data: orders, isLoading: isOrdersLoading } = useGetOrdersQuery();
  const [isStatusModify, setIsStatusModify] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(OrderStatus[0]);

  const [useUpdateOrderStatus] = useUpdateOrderStatusMutation();

  const handleUpdate = async (id: number) => {
    if (!isStatusModify) {
      setIsStatusModify(true);
      return;
    }

    const index = OrderStatus.findIndex((item) => item === status);

    await useUpdateOrderStatus({
      id,
      status: OrderStatus[index],
    });

    setIsStatusModify(false);
    return;
  };

  if (isOrdersLoading) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle>Rendelések</PageTitle>

      <section className="flex justify-center items-center flex-col">
        {orders &&
          orders.map((order) => (
            <Card
              className="p-8 md:w-[46rem] flex flex-col"
              key={order.orderId}
            >
              <Properties property="Név" value={order.fullname} />
              <Properties property="Cím" value={order.address} />
              <Properties
                property="Dátum"
                value={`${convertDate(order.orderDate)}`}
              />
              <Properties property="Telefonszám" value={order.phoneNumber} />
              <Properties property="Ár" value={`${order.totalOrderPrice} Ft`} />
              <Properties
                property="Rendelés állapota"
                value={order.deliveryStatus.statusName}
              />

              <h2 className="text-lg text-center mt-4 font-semibold">
                Tételek
              </h2>
              {order.orderItems.map((item) => (
                <section
                  key={item.orderItemId}
                  className="w-1/2 flex flex-col mx-auto my-6"
                >
                  <Properties
                    className="my-0"
                    property="Étel"
                    value={item.foods.name}
                  />
                  <Properties
                    className="my-0"
                    property="Mennyiség"
                    value={`${item.quantity} db`}
                  />
                  <Properties
                    className="my-0"
                    property="Ár"
                    value={`${item.totalPrice} Ft`}
                  />
                </section>
              ))}

              {isStatusModify && (
                <div className="flex justify-center gap-10 items-center mt-1 mb-6">
                  <label htmlFor="option" className="font-semibold">
                    Státusz
                  </label>
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    id="option"
                    className="border-2 py-1 px-4 rounded-2xl focus:outline-baseColor"
                  >
                    {OrderStatus.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div
                className="flex justify-center"
                onClick={() => handleUpdate(order.orderId)}
              >
                <Button className="">Státusz módosítás</Button>
              </div>
            </Card>
          ))}
      </section>
    </>
  );
};

export default AllOrder;
