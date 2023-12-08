import Sidebar from "../Sidebar";

const DashboardTemplate = (props: { children: React.ReactElement }) => {
  const { children } = props;

  return (
      <div className="border-t-4 flex flex-row">
        <Sidebar />
        {children}
      </div>
  );
};

export default DashboardTemplate;
