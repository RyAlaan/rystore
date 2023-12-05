import DashboardTemplate from "@/components/layouts/Dashboard"
import { fetcher } from "@/lib/swr/fetcher";
import useSWR from "swr";

const DashboardOrders = () => {
      const { data, isLoading, error } = useSWR("/api/orders", fetcher);


    return (
        <DashboardTemplate>
            <div className=""></div>
        </DashboardTemplate>
    )
}

export default DashboardOrders