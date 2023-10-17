import {
  faBars,
  faCartShopping,
  faHome,
  faListCheck,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react"; // Import useSession
import SearchBox from "@/components/fragments/SearchBox";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession(); // Get the user session data

  console.log(session);

  const Nav = [
    {
      name: "Home",
      to: "/",
      icon: faHome,
    },
    {
      name: "Contact",
      to: "/contact",
      icon: faHome,
    },
    {
      name: "About",
      to: "/about",
      icon: faHome,
    },
  ];

  return (
    <div className="w-full flex flex-row px-4 md:px-8 py-2 justify-between border-b-2 fixed font-poppins bg-white z-[999]">
      <h2 className="hidden md:flex text-2xl font-semibold">Rystore</h2>
      <div className="fixed bottom-0 left-0 gap-x-9 items-center justify-between w-full px-10 py-2 flex flex-row bg-white border-t-2 lg:w-auto lg:py-0 lg:border-none lg:static">
        {Nav.map((item, index) => (
          <Link href={item.to} key={index}>
            <div
              className={clsx(
                "items-center flex flex-col text-xs font-semibold md:text-base",
                pathname === item.to ? "text-secondary md:underline" : ""
              )}
            >
              <FontAwesomeIcon icon={item.icon} className="md:hidden" />
              <p className="">{item.name}</p>
            </div>
          </Link>
        ))}
        {session ? (
          <button
            onClick={() => {
              signOut();
            }}
          >
            <div
              className={clsx(
                "items-center flex flex-col text-xs font-semibold md:text-base",
                pathname === "/auth/login" ? "text-secondary md:underline" : ""
              )}
            >
              <FontAwesomeIcon icon={faRightToBracket} className="md:hidden" />
              <p className="">SignOut</p>
            </div>
          </button>
        ) : (
          <Link href={"/auth/login"}>
            <div
              className={clsx(
                "items-center flex flex-col text-xs font-semibold md:text-base",
                pathname === "/auth/login" ? "text-secondary md:underline" : ""
              )}
            >
              <FontAwesomeIcon icon={faRightToBracket} className="md:hidden" />
              <p className="">SignIn</p>
            </div>
          </Link>
        )}
        {session && session.user.role === "admin" && (
          <Link href={"/dashboard"}>
            <div
              className={clsx(
                "items-center flex flex-col text-xs font-semibold md:text-base",
                pathname === "/dashboard" ? "text-secondary md:underline" : ""
              )}
            >
              <FontAwesomeIcon icon={faListCheck} className="md:hidden" />
              <p className="">Dahsboard</p>
            </div>
          </Link>
        )}
      </div>
      <SearchBox className="w-fit border" />
      <div className="buttons flex flex-row pl-2 gap-x-4 md:gap-x-6">
        <Link href="/" className="bg-transparent">
          <FontAwesomeIcon icon={faHeart} className="text-black" />
        </Link>
        {session && (
          <Link href="/profile">
            <FontAwesomeIcon icon={faUser} className="text-black" />
          </Link>
        )}
        <Link href="/" className="bg-transparent p-0">
          <FontAwesomeIcon icon={faCartShopping} className="text-black" />
        </Link>
        <Link href="/" className="bg-transparent p-0">
          <FontAwesomeIcon icon={faBars} className="text-black" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
