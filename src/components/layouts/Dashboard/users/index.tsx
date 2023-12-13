import { userType } from "@/types/userType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import SearchBox from "@/components/fragments/SearchBox";
import UserList from "./UserList";

const UsersHeader = ({ users }: { users: userType[] }) => {
  return (
    <div className="w-[calc(100%-72px)] h-screen md:h-[calc(100vh-66px)] self-end">
      <div className="flex flex-row justify-between px-4 w-full py-5 gap-x-10 ">
        <SearchBox
          placeholder="Search users"
          className="w-full rounded-full border-2"
        />
        <Link
          href={"/dashboard/create/users"}
          className="border border-black text-black rounded-full items-center flex flex-row px-4 gap-x-2"
        >
          <p className="hidden md:flex">Add users</p>
          <FontAwesomeIcon icon={faPlus} className="aspect-square" />
        </Link>
      </div>
      <div className="w-full flex flex-wrap justify-betwen gap-5 py-8 px-4 h-[calc(100vh-60px)] md:h-[calc(100vh-120px)] overflow-y-auto">
        {users?.map((user: userType, index: number) => (
          <UserList key={index} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersHeader;
