import Breadcumb from "../../fragments/Breadcumb";
import Sidebar from "../Sidebar";

const DashboardTemplate = (props: { children: React.ReactElement }) => {
  const { children } = props;

  return (
      <div className="md:border-t-4 flex flex-row mt-12 md:mt-0">
        <Sidebar />
        {children}
      </div>
  );
};

export default DashboardTemplate;
