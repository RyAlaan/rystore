import { useSidebar } from "@/context/SidebarContext";
import useInitial from "@/hooks/useInitial";
import {
  faBackwardStep,
  faBagShopping,
  faBarsProgress,
  faBoxesStacked,
  faEllipsisVertical,
  faForwardStep,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar: React.FC = () => {
  const { showSidebar, toggleSidebar } = useSidebar();
  const router = useRouter();
  const { data: session } = useSession();
  const lists = [
    {
      name: "Home",
      icon: faHouse,
      link: "/",
    },
    {
      name: "Dashboard",
      icon: faBarsProgress,
      link: "/dashboard",
    },
    {
      name: "Users",
      icon: faUser,
      link: "/dashboard/users",
    },
    {
      name: "Products",
      icon: faBoxesStacked,
      link: "/dashboard/products",
    },
    {
      name: "Orders",
      icon: faBagShopping,
      link: "/dashboard/orders",
    },
  ];

  return (
    <div className="h-screen md:h-[calc(100vh-66px)] absolute z-[99999] bg-white">
      <div className="h-full flex flex-col justify-between bg-white border-r shadow-sm">
        <div className="">
          <div className="p-4 flex justify-between items-center rounded">
            <p
              className={clsx(
                "font-bold text-2xl overflow-hidden transition-all duration-500",
                showSidebar ? "w-32" : "w-0"
              )}
            >
              RyStore
            </p>
            <button
              className="rounded-lg w-10 aspect-square items-center text-center hover:bg-red-500 hover:text-white p-2"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon
                className="text-center"
                icon={showSidebar ? faBackwardStep : faForwardStep}
              />
            </button>
          </div>
          <div className="px-4 gap-y-2 flex flex-col">
            {lists.map((list, index) => (
              <Link
                key={index}
                href={list.link}
                className={clsx(
                  router.route == list.link && "bg-red-500 text-white",
                  router.route != list.link
                    ? "hover:bg-red-50"
                    : "hover:red-500",
                  !showSidebar && "w-10",
                  " flex justify-between rounded group"
                )}
              >
                <div
                  className={clsx(
                    "flex items-center w-full z-[99]",
                    showSidebar ? "justify-normal" : "justify-center gap-x-0",

                    router.route !== list.link && "group-hover:text-red-600"
                  )}
                >
                  <FontAwesomeIcon icon={list.icon} className={clsx("p-4")} />
                  <p
                    className={clsx(
                      "font-semibold overflow-hidden transition-all ",
                      showSidebar ? "w-full" : "w-0"
                    )}
                  >
                    {list.name}
                  </p>
                </div>
                {!showSidebar && (
                  <div
                    className={clsx(
                      "relative px-4 flex flex-col items-center justify-center rounded-md -left-56 transform-all duration-500 lg:group-hover:translate-x-64 z-10",
                      router.route == list.link
                        ? "bg-red-500 text-white"
                        : "bg-red-100 text-red-600"
                    )}
                  >
                    <p className="font-semibold m-2">{list.name}</p>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t flex flex-row items-center justify-center p-2">
          <div className="p-2 rounded bg-red-200 w-10 aspect-square text-center">
            <p className="font-semibold text-red-600">
              {session?.user.fullname && useInitial(session?.user.fullname)}
            </p>
          </div>
          <div
            className={clsx(
              "flex flex-col overflow-hidden",
              showSidebar ? "w-full ml-3" : "w-0"
            )}
          >
            <p className="font-semibold">{session?.user.fullname}</p>
            <p className="text-stone-400">{session?.user.email}</p>
          </div>
          <div
            className={clsx(
              "flex flex-col gap-y-1 overflow-hidden",
              showSidebar ? "w-fit ml-3" : "w-0 ml-0"
            )}
          >
            <button className="p-2">
              <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
