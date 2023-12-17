import DashboardTemplate from "@/components/layouts/Dashboard"
import OrdersHeader from "@/components/layouts/Dashboard/orders";
import { fetcher } from "@/lib/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";

const DashboardOrders = () => {
  const { query } = useRouter();
  const newLink =
    query &&
    Object.entries(query)
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join("&");

  const { data, isLoading, error } = useSWR(
    "/api/orders?" + newLink.toString(),
    fetcher
  );

  return (
    <div className="">
      <DashboardTemplate>
        <OrdersHeader orders={isLoading ? [] : data?.data} />
      </DashboardTemplate>
    </div>
  );
}

export default DashboardOrders