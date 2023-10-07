import { userType } from "@/types/userType";
import TableUser from "./TableUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const UsersHeader = ({ users }: { users: userType[] }) => {
  console.log(users);

  return (
    <div className="w-5/6 flex flex-col py-6 px-5 font-poppins">
      <div className="w-full flex justify-end">
        <Link href={"/dashboard/create/user"} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Add User <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
      <div className="w-full  rounded-md px-2 py-2 flex flex-row justify-between">
        <div className="image w-14 text-center">
          <p className="text-md font-semibold">Image</p>
        </div>
        <div className="w-40 h-full flex flex-col justify-center text-center">
          <p className="text-md font-semibold">Full Name</p>
        </div>
        <div className="w-40 h-full flex flex-col justify-center text-center">
          <p className="text-md font-semibold">Email</p>
        </div>
        <div className="w-28 h-full flex flex-col justify-center text-center">
          <p className="text-md font-semibold">Role</p>
        </div>
        <div className="w-36 h-full flex flex-col justify-center text-center">
          <p className="text-md font-semibold">Phone</p>
        </div>
        <div className="w-28 h-full flex flex-col justify-center text-center">
          <p className="text-md font-semibold">Actions</p>
        </div>
      </div>
      <div className="h-96 overflow-auto">
        {users.map((user, index) => (
          <TableUser
            key={index}
            user={user}
            className={index % 2 === 1 ? "" : "bg-neutral-200"}
          />
        ))}
      </div>
    </div>
  );
};

export default UsersHeader;
