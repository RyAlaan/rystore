import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Sidebar from "@/components/layouts/Sidebar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const UpdateUserPage: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setIsLoading ] = useState(false)
  const [error, setError] = useState("")


  const handleChanges = async(e : any) => {
    e.preventDefault();
    setIsLoading( true)
    setError("")
    try {
      // const res = await
    } catch (error) {
      
    }
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
      <div className="flex flex-row justify-center">
        {/* <div className="sidebar w-1/6 hidden lg:flex">
          <ul className="px-8">
            <li>
              <p className="font-semibold">Manage My Account</p>
              <ul className="pl-10 py-3">
                <li className="text-secondary">
                  <Link href={"/profile"}>My Profile</Link>
                </li>
                <li className="text-stone-400">
                  <Link href={"/profile/address"}>Address Book</Link>
                </li>
                <li className="text-stone-400">
                  <Link href={"/profile/payment"}>My Payment Options</Link>
                </li>
              </ul>
            </li>
            <li>
              <p className="font-semibold">
                <Link href={"/orders"}>My Orders</Link>
              </p>
              <ul className="pl-10 py-3">
                <li className="text-stone-400">
                  <Link href={"/orders/returns"}>My Returns</Link>
                </li>
                <li className="text-stone-400">
                  <Link href={"/orders/cancellations"}>My Cancellations</Link>
                </li>
              </ul>
            </li>
            <li>
              <p className="font-semibold">
                <Link href={"/wishlist"}>My Wishlists</Link>
              </p>
            </li>
          </ul>
        </div> */}
        <Sidebar />
        <div className="lg:w-5/6 px-8 py-6 lg:py-10 lg:px-20 flex flex-col justify-center gap-y-4">
          
        </div>
      </div>
    </div>
  );
};

export default UpdateUserPage;
