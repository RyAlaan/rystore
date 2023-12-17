import { fetcher } from "@/lib/swr/fetcher";
import { orderType } from "@/types/orderType";
import { userType } from "@/types/userType";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useEffect, useState } from "react";
import useSWR from "swr";

const OrdersList = ({ order }: { order: orderType }) => {
  const [user, setUser] = useState<userType | null>(null);

  const { data, error, isLoading } = useSWR(
    `/api/users/${order.userId}`,
    fetcher
  );

  useEffect(() => {
    setUser(data?.data);
  }, [data]);

  const declineOrder = async () => {
    await fetch(`/api/orders/${order.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderStatus: "Rejected" }),
    });
  window.location.reload();};


  const acceptOrder = async () => {
    let nextOrderStatus = "";
    switch (order.orderStatus) {
      case "Awaiting Payment":
        nextOrderStatus = "Awaiting Confirmation";
        break;
      case "Awaiting Confirmation":
        nextOrderStatus = "Awaiting Pickup";
        break;
      case "Awaiting Pickup":
        nextOrderStatus = "Completed";
        break;

      default:
        break;
    }
    await fetch(`/api/orders/${order.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderStatus: nextOrderStatus }),
    });
  window.location.reload(); };

  return (
    <div className="flex flex-row justify-between text-center min-h-[40px] py-3 border-y">
      <p className="w-48 flex items-center justify-center">{order.orderCode}</p>
      <p className="w-48  flex items-center justify-center">{user?.fullname}</p>
      <div className="w-48 flex items-center justify-center">
        {order.image && <img src={order.image} alt="" className="w-10 h-10" />}
      </div>
      <p className="w-48  flex items-center justify-center">
        {order.totalPrice.toLocaleString("en-EN", {
          style: "currency",
          currency: "USD",
        })}
      </p>
      <p
        className={clsx(
          "w-48  flex items-center justify-center border rounded-full",
          order.orderStatus == "Canceled" || order.orderStatus == "Rejected"
            ? "text-red-500 border-red-500"
            : order.orderStatus == "Awaiting Payment"
            ? "text-gray-500 border-gray-500"
            : order.orderStatus == "Awaiting Confirmation"
            ? "text-yellow-500 border-yellow-500"
            : order.orderStatus == "Awaiting Pickup"
            ? "text-blue-500 border-blue-500"
            : "text-green-500 border-green-500"
        )}
      >
        {order.orderStatus}
      </p>

      <div className="w-48  flex items-center justify-center gap-x-3">
        {order.orderStatus == "Canceled" ||
        order.orderStatus == "Rejected" ||
        order.orderStatus == "Completed" ||
        order.image == null ? (
          ""
        ) : (
          <>
            <button className="w-10 aspect-square border-2 rounded-md border-green-500" onClick={acceptOrder}>
              <FontAwesomeIcon
                icon={faCheck}
                className="text-green-500 text-xl"
              ></FontAwesomeIcon>
            </button>
            <button className="w-10 aspect-square border-2 rounded-md border-red-500" onClick={declineOrder}>
              <FontAwesomeIcon
                icon={faXmark}
                className="text-red-500 text-xl"
              ></FontAwesomeIcon>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersList;
