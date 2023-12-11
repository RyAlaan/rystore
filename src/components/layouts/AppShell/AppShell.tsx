import { useRouter } from "next/router";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Breadcumb from "../../fragments/Breadcumb";
import Sidebar from "../Sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

const enableSidebar = ["/dashboard"];
const disableNavbar = ["/404"];
const disableBreadcumb = ["/", "/404", "/auth/login", "/auth/register"];

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const { pathname } = useRouter();

  const isDashboardPage = pathname.includes("/dashboard");

  return (
    <main>
      {!isDashboardPage && !disableNavbar.includes(pathname) && <Navbar />}
      {!disableBreadcumb.includes(pathname) && <Breadcumb />}
      <div className="flex flex-row">
        {enableSidebar.includes(pathname) && <Sidebar />}
        {children}
      </div>
      {!disableNavbar.includes(pathname) && <Footer />}
    </main>
  );
};

export default AppShell;