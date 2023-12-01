import DashboardTemplate from "@/components/layouts/Dashboard";
import UsersHeader from "@/components/layouts/Dashboard/users";
import { fetcher } from "@/lib/swr/fetcher";
import useSWR from "swr";

const DashboardUsers = () => {
  const { data, isLoading, error } = useSWR("/api/users", fetcher);

  return (
    <DashboardTemplate>
      <UsersHeader users={isLoading ? [] : data?.data} />
    </DashboardTemplate>
  );
};

export default DashboardUsers;
