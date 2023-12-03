import Message from "@/components/fragments/Message";
import { fetcher } from "@/lib/swr/fetcher";
import { orderType } from "@/types/orderType";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

const orderPage = () => {
  const { data: session } = useSession();
  const [orderData, setOrderData] = useState<orderType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [failed, setFailed] = useState<string>("");

  const { data, error, isLoading } = useSWR(
    "/api/orders/" + session?.user?.id,
    fetcher
  );

  useEffect(() => {
    setOrderData(data?.data?.orderData.reverse());
  }, [data]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    setSuccess("");
    setFailed("");
    // const data = orderData.map((order) => {
    //   if (order.orderCode === orderCode) {
    //     return {
    //       ...order,
    //       orderStatus: "Cancelled",
    //     };
    //   }
    //   return order;
    // });

    // console.log(data);

    const data = orderData.find(
      (order) => order.id === id
    );

    if (data && data.orderStatus === "Awaiting Payment") {
      data.orderStatus = "Canceled";
    }

    console.log(data);


    const result = await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        data
      ),
    });

    const response = await result.json();
    if (result.status == 200) {
      window.location.reload();
      setSuccess("Order Canceled");
    } else {
      setFailed(response.message);
    }

    setLoading(false);
  };

  if (isLoading) {
    return <div className="">Loading...</div>;
  }

  return (
    <div className="flex flex-col font-poppins px-2 lg:px-8 gap-y-5">
      <Message success={success} failed={failed} />
      <div className="flex w-full px-10 py-6 shadow-sm gap-x-2">
        <p className="w-20 text-center">Num</p>
        <div className="flex flex-row w-full justify-between">
          <p className="w-44 text-center">Order Code</p>
          <p className="w-44 text-center">Full Name</p>
          <p className="w-44 text-center">Order Status</p>
          <p className="w-44 text-center">Proof of Payment</p>
          <p className="w-44 text-center">Total Price</p>
          <p className="w-44 text-center">Actions</p>
        </div>
      </div>
      {orderData &&
        orderData.map((order, index) => (
          <div
            key={index}
            className="flex w-full px-10 py-6 shadow-sm gap-x-2 items-center"
          >
            <p className="w-20 text-right">{index + 1}</p>
            <div className="flex flex-row w-full justify-between items-center">
              <p className="w-44 text-center">{order.orderCode}</p>
              <p className="w-44 text-center">{session?.user.fullname}</p>
              <p className="w-44 text-center">{order.orderStatus}</p>
              <div className="w-44 text-center">
                {order.image !== null ? (
                  <img src={order.image} alt="" className="h-14 rounded-sm" />
                ) : (
                  <div className="h-14"></div>
                )}
              </div>
              <p className="w-44 text-center">
                {order.totalPrice.toLocaleString("en-EN", {
                  style: "currency",
                  currency: "USD",
                })}
              </p>
              <div className="w-44 text-center">
                <button onClick={() => handleDelete(order.id)}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="bg-secondary text-white p-3 rounded-md"
                  ></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default orderPage;
