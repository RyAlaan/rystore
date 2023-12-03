import { deleteDataById } from "@/lib/firebase/service";
import { userType } from "@/types/userType";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TableUser = ({
  user,
  className,
}: {
  user: userType;
  className?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const deleteFunction = async (id: string) => {
    setLoading(true);
   const result = await fetch(`/api/users/${id}`, {
     method: "DELETE",
   });

   if (result.status === 200) {
     window.location.reload();
     setSuccess("Data deleted successfully");
   } else {
     setError(result.status === 405 ? "method not allowed" : "something wrong");
   }
   setLoading(false);
  };

  return (
    <div
      className={clsx(
        className,
        "w-full  rounded-md px-2 py-2 flex flex-row justify-between"
      )}
    >
      <div className="image w-14">
        <Image
          src={user.image ? user.image : "https://placehold.co/56"}
          className="object-cover"
          alt=""
        />
      </div>
      <div className="w-40 h-full flex flex-col justify-center">
        <p className="text-md font-semibold">{user.fullname}</p>
      </div>
      <div className="w-40 h-full flex flex-col justify-center">
        <p className="text-md ">{user.email}</p>
      </div>
      <div className="w-28 h-full flex flex-col justify-center text-center">
        <p>{user.role}</p>
      </div>
      <div className="w-36 h-full flex flex-col justify-center text-center">
        <p>+29 830-7506-1293</p>
      </div>
      <div className="w-28 flex flex-row justify-between text-center p-2 ">
        <Link
          href={`/dashboard/update/user/${user.id}`}
          className="bg-blue-600 rounded-md aspect-square flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faEdit} className="text-white" />
        </Link>
        <button
          onClick={() => deleteFunction(user.id)}
          className="bg-red-600 rounded-md aspect-square flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faTrash} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default TableUser;
