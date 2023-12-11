import Sidebar from "../Sidebar";

const DashboardTemplate = (props: { children: React.ReactElement }) => {
  const { children } = props;

  return (
    <div className="md:border-t-2 flex flex-row w-full">
      
      <div className="flex justify-end w-full">{children}</div>
    </div>
  );
};

export default DashboardTemplate;
