import { useRouter } from "next/router";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Breadcumb from "../../fragments/Breadcumb";

type AppShellProps = {
  children: React.ReactNode;
};

const disableNavbar = ["/404"];
const disableBreadcumb = ["/", "/404", "/auth/login", "/auth/register"];

const AppShell = (props: AppShellProps) => {
  const { children } = props;
  const { pathname } = useRouter();

  return (
    <main>
      {!disableNavbar.includes(pathname) && <Navbar />}
      {!disableBreadcumb.includes(pathname) && <Breadcumb />}
      {children}
      {!disableNavbar.includes(pathname) && <Footer />}
    </main>
  );
};

export default AppShell;
