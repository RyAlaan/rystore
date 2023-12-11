import Sidebar from "../Sidebar";

const DashboardTemplate = (props: { children: React.ReactElement }) => {
  const { children } = props;

  return (
      <div className="md:border-t-2 flex flex-row mt-12 md:mt-0">
        <Sidebar />
        {children}
      </div>
  );
};

export default DashboardTemplate;
