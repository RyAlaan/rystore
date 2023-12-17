import useInitial from "@/hooks/useInitial";
import { userType } from "@/types/userType";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

const UserList = ({
  user,
  className,
}: {
  user: userType;
  className?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const initials = user.fullname ? useInitial(user.fullname) : "";

  const deleteFunction = async (id: string) => {
    setLoading(true);
    const result = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (result.status === 200) {
      window.location.reload();
      setSuccess("Data deleted successfully");
    } else {
      setError(
        result.status === 405 ? "method not allowed" : "something wrong"
      );
    }
    setLoading(false);
  };

  return (
    <Link
      href={`/dashboard/users/${user.id}`}
      className={clsx(
        className,
        "w-full  rounded-md px-2 py-2 flex flex-row items-center gap-x-5 justify-between"
      )}
    >
      <div className="flex flex-row gap-x-5">
        <div className="p-2 rounded bg-red-200 w-10 h-10 text-center">
          <p className="font-semibold text-red-600">
            {initials}
          </p>
        </div>
        <div className={clsx("flex flex-col overflow-hidden w-56 px-4")}>
          <p className="font-semibold line-clamp-1">{user.fullname}</p>
          <p className="text-stone-400 line-clamp-1">{user.email}</p>
        </div>
      </div>
      <div className="w-40 flex flex-row items-center justify-center">
        <div
          className={clsx(
            "rounded-full px-4 border w-fit ",
            user.role === "admin"
              ? "border-red-600 text-white"
              : "border-green-600 text-white"
          )}
        >
          {user.role === "admin" ? (
            <p className="text-red-600">Admin</p>
          ) : (
            <p className="text-green-600">User</p>
          )}
        </div>
      </div>
      <div className="w-56 md:flex flex-col items-center justify-center hidden">
        {" "}
        <p className="text-stone-400 line-clamp-1 w-56">{user.phone}</p>
      </div>
      <div
        className="flex flex-col items-center justify-center bg-secondary text-white w-8 rounded-md aspect-square "
        onClick={() => deleteFunction(user.id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>
    </Link>
  );
};

export default UserList;
