import Sidebar from "../Sidebar";

const DashboardTemplate = (props: { children: React.ReactElement }) => {
  const { children } = props;

  return (
    <div className="md:border-t-2 flex flex-row w-full">
      <Sidebar/>
      {children}
      {/* <div className="flex">{children}</div> */}
    </div>
  );
};

export default DashboardTemplate;
