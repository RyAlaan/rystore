import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Sidebar from "@/components/layouts/Sidebar";
import { fetcher } from "@/lib/swr/fetcher";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

const UpdateUserPage: React.FC = () => {
  const { data, error, isLoading } = useSWR("/api/user/123", fetcher);

  const handleChanges = (event:any) => {

  }

  return (
    <div>
      <div className="flex flex-col font-poppins px-3">
        <div className="mt-12 px-5 py-2 md:py-8 flex justify-between">
          <p className="text-stone-400">
            <Link href={"/"}>home</Link> /{" "}
            <Link href={"/profile"} className="text-secondary">
              MyAccount
            </Link>
          </p>
          {/* {session ? (
            <p>
              welcome{" "}
              <span className="text-secondary">{session.user?.fullname}</span>
            </p>
          ) : (
            <p>Not logged in</p>
          )} */}
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <Sidebar />
        <form
          className="lg:w-5/6 px-8 py-6 lg:py-10 lg:px-20 flex flex-col justify-center gap-y-4"
          onSubmit={handleChanges}
        >
          <p className="md:text-lg text-secondary font-medium">
            Edit Your Profile
          </p>
          <div className="flex flex-col md:flex-row justify-between gap-x-10">
            <div className="">
              <label htmlFor="First Name">First Name</label>
              <Input
                type="text"
                // placeholder={session?.user?.firstname}
                placeholder="a"
                className="bg-stone-200 rounded-sm lg:w-72"
              />
            </div>
            <div className="">
              <label htmlFor="Last Name">Last Name</label>
              <Input
                placeholder="a"
                type="text"
                // placeholder={session?.user?.lastname}
                className="bg-stone-200 rounded-sm lg:w-72"
                />
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-x-10">
            <div className="">
              <label htmlFor="Email">Email</label>
              <Input
                type="text"
                // placeholder={session?.user?.email}
                placeholder="a"
                className="bg-stone-200 rounded-sm lg:w-72"
                />
            </div>
            <div className="">
              <label htmlFor="address">address</label>
              <Input
                type="text"
                placeholder=""
                className="bg-stone-200 rounded-sm lg:w-72"
                />
            </div>
          </div>
          <div className="w-full flex flex-col gap-y-2">
            <p>Password Changes</p>
            <Input
              type="password"
              placeholder="Curent Password"
              className="bg-stone-200 rounded-sm"
              />
            <Input
              type="password"
              placeholder="New Password"
              className="bg-stone-200 rounded-sm"
              />
            <Input
              type="password"
              placeholder="Confirm Password"
              className="bg-stone-200 rounded-sm"
              />
          </div>
          <div className="button-container flex gap-x-4 justify-end">
            <Button
              type="reset"
              className="bg-white text-black rounded-none py-4 px-10"
              >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-secondary text-white rounded-none py-4 px-10 font-medium"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserPage;
