import SearchBox from "@/components/fragments/SearchBox";
import { orderType } from "@/types/orderType";
import OrdersList from "./OrdersList";

const OrdersDashboard = ({ orders }: { orders: orderType[] }) => {
  return (
    <div className="w-[calc(100%-72px)] h-screen md:h-[calc(100vh-66px)] self-end">
      <div className="flex flex-row justify-between px-4 w-full py-5 gap-x-10 ">
        <SearchBox
          placeholder="Search orders"
          className="w-full rounded-full border-2"
        />
      </div>
      <div className="w-full flex flex-col flex-wrap justify-betwen gap-5 py-8 px-4 h-[calc(100vh-75px)] md:h-[calc(100vh-140px)] overflow-y-auto">
        <div className="px-4 flex flex-row justify-between items-center text-center">
          <p className="w-48">Order Code</p>
          <p className="w-48">User Name</p>
          <p className="w-48">Image</p>
          <p className="w-48">Total Price</p>
          <p className="w-48">Order Status</p>
          <p className="w-48">Action</p>
        </div>
        {orders?.map((order: orderType, index: number) => (
          <OrdersList key={index} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersDashboard;
