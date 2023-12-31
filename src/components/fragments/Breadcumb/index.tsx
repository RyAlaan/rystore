import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcumb = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  if (pathname === null) {
    return null;
  }
  const paths = pathname.split("/").filter(Boolean);  

  return (
    <div className="hidden md:flex flex-col font-poppins px-3">
      <div
        className={clsx(
          "px-5 py-2 md:py-5 flex justify-between",
          pathname.includes("dashboard") ? "" : "mt-12"
        )}
      >
        <p className="font-light text-tertiary">
          <Link href={"/"}>Home</Link>
          {paths.map((path, index) => (
            <Link
              href={"/" + path}
              key={index}
              className={index === paths.length - 1 ? "text-secondary" : ""}
            >
              {" / "}
              {path}
            </Link>
          ))}
        </p>
        {session ? (
          <p>
            welcome{" "}
            <span className="text-secondary">{session.user?.fullname}</span>
          </p>
        ) : (
          <p>Not logged in</p>
        )}
      </div>
    </div>
  );
};

export default Breadcumb;
