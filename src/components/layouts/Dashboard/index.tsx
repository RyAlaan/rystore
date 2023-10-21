import Breadcumb from "../Breadcumb";
import Sidebar from "../Sidebar";

const DashboardTemplate = (props: { children: React.ReactElement }) => {
  const { children } = props;

  return (
    <div className="">
      <div className="border-t-4 flex flex-row">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default DashboardTemplate;
