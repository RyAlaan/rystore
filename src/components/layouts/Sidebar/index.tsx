import {
  faBackwardStep,
  faBars,
  faEllipsisVertical,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const Sidebar: React.FC = () => {
  const [show, setShow] = useState<boolean>(true);
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session?.user.role);
  

  // return (
  //   <div className="sidebar w-1/6 hidden lg:flex h-[calc(100vh-120px)] border-r-4">
  //     <ul className="px-8 pt-12">
  //       {session?.user.role ? (
  //         <li>
  //           <Link href={"/dashboard"} className="font-semibold">
  //             Dashboard
  //           </Link>
  //           <ul className="pl-10 py-3">
  //             <li className="text-stone-400">
  //               <Link href={"/dashboard/users"}>Users</Link>
  //             </li>
  //             <li className="text-stone-400">
  //               <Link href={"/dashboard/products"}>Products</Link>
  //             </li>
  //             <li className="text-stone-400">
  //               <Link href={"/dashboard/orders"}>Orders</Link>
  //             </li>
  //             <li className="text-stone-400">
  //               <Link href={"/dashboard/transaction"}>Transactions</Link>
  //             </li>
  //           </ul>
  //         </li>
  //       ) : (
  //         ""
  //       )}

  //       <li>
  //         <p className="font-semibold">Manage My Account</p>
  //         <ul className="pl-10 py-3">
  //           <li className="text-stone-400">
  //             <Link href={"/profile"}>My Profile</Link>
  //           </li>
  //           <li className="text-stone-400">
  //             <Link href={"/profile/address"}>Address Book</Link>
  //           </li>
  //           <li className="text-stone-400">
  //             <Link href={"/profile/payment"}>My Payment Options</Link>
  //           </li>
  //         </ul>
  //       </li>
  //       <li>
  //         <p className="font-semibold">
  //           <Link href={"/orders"}>My Orders</Link>
  //         </p>
  //         <ul className="pl-10 py-3">
  //           <li className="text-stone-400">
  //             <Link href={"/orders/returns"}>My Returns</Link>
  //           </li>
  //           <li className="text-stone-400">
  //             <Link href={"/orders/cancellations"}>My Cancellations</Link>
  //           </li>
  //         </ul>
  //       </li>
  //       <li>
  //         <p className="font-semibold">
  //           <Link href={"/wishlist"}>My Wishlists</Link>
  //         </p>
  //       </li>
  //     </ul>
  //   </div>
  // );
  return (
    <div className="h-[calc(100vh-120px)]">
      <div className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 gap-x-3 flex justify-between items-center rounded">
          <p className={clsx("font-semibold", !show && "hidden")}>LoremIpsum</p>
          <button className="rounded-lg hover:bg-gray-100 flex flex-col items-center">
            <FontAwesomeIcon
              icon={show ? faBackwardStep : faForwardStep}
              className="px-3 py-2"
            ></FontAwesomeIcon>
          </button>
        </div>
        <div className="border-t flex flex-row p-4 items-center gap-x-4 self-end">
          <div className="p-2 rounded bg-red-200">
            <p className="font-semibold text-red-600">DA</p>
          </div>
          <div className="w-52 ml-3">
            <p className="font-semibold">{session?.user.fullname}</p>
            <p className="text-stone-400">{session?.user.email}</p>
          </div>
          <div className="">
          <button className="px-3 py-2">
            <FontAwesomeIcon icon={faEllipsisVertical}></FontAwesomeIcon>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
