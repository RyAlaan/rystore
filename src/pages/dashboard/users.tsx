import DashboardTemplate from "@/components/layouts/Dashboard";
import UserDashboard from "@/components/layouts/Dashboard/users";
import { fetcher } from "@/lib/swr/fetcher";
import useSWR from "swr";

const DashboardUsers = () => {
  const { data, isLoading, error } = useSWR("/api/users", fetcher);

  return (
    <div className="">
      <DashboardTemplate>
        <UserDashboard users={isLoading ? [] : data?.data} />
      </DashboardTemplate>
    </div>
  );
};

export default DashboardUsers;
