import { orderType } from "@/types/orderType";

interface ordersDashboardType {
  orders: orderType[];
}

const OrdersDashboard = (props: ordersDashboardType) => {
  const { orders } = props;

  return <div className="w-full flex flex-col "></div>;
};

export default OrdersDashboard;
