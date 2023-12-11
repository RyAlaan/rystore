import DashboardTemplate from "@/components/layouts/Dashboard";
import ProductsDashboard from "@/components/layouts/Dashboard/products";
import { fetcher } from "@/lib/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";

const DashboardProducts = () => {
  const { query } = useRouter();
  const newLink =
    query &&
    Object.entries(query)
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join("&");

  const { data, isLoading, error } = useSWR(
    "/api/products?" + newLink.toString(),
    fetcher
  );

  return (
    <div className="">
      <DashboardTemplate>
        <ProductsDashboard products={isLoading ? [] : data?.data} />
      </DashboardTemplate>
    </div>
  );
};

export default DashboardProducts;
