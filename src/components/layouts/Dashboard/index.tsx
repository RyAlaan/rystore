import Header from "../Header/Header";
import Sidebar from "../Sidebar";

const DashboardTemplate = (props: { children: React.ReactElement }) => {
  const { children } = props;

  return (
    <div className="">
      <div className="flex flex-col font-poppins px-3">
        <Header />
      </div>
      <div className="border-t-4 flex flex-row">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default DashboardTemplate;
