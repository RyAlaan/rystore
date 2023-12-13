import Sidebar from "../Sidebar";

const DashboardTemplate = (props: { children: React.ReactElement }) => {
  const { children } = props;

  return (
    <div className="md:border-t-2 flex flex-row w-full">
      <Sidebar />
      <div className="flex flex-col w-full justify-end">{children}</div>
    </div>
  );
};

export default DashboardTemplate;
