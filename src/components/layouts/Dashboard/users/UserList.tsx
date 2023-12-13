import { deleteDataById } from "@/lib/firebase/service";
import { userType } from "@/types/userType";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Image from "next/image";
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
      .
    </div>
  );
};

export default UserList;
