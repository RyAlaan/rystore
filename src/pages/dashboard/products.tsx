import DashboardTemplate from "@/components/layouts/Dashboard";
import ProductsDashboard from "@/components/layouts/Dashboard/products";
import { fetcher } from "@/lib/swr/fetcher";
import useSWR from "swr";

const DashboardProducts = () => {
  const { data, isLoading, error } = useSWR("/api/products", fetcher);

  return (
    <DashboardTemplate>
      <ProductsDashboard products={isLoading ? [] : data?.data} />
    </DashboardTemplate>
  );
};

export default DashboardProducts;
