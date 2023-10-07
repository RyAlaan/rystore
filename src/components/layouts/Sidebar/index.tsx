import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session?.user.role);
  console.log(router.pathname);
  

  return (
    <div className="sidebar w-1/6 hidden lg:flex border-r-4">
      <ul className="px-8">
        {session?.user.role ? (
          <li>
            <Link href={"/dashboard"} className="font-semibold">Dashboard</Link>
            <ul className="pl-10 py-3">
              <li className="">
                <Link href={"/dashboard/users"}>Users</Link>
              </li>
              <li className="text-stone-400">
                <Link href={"/dashboard/products"}>Products</Link>
              </li>
              <li className="text-stone-400">
                <Link href={"/dashboard/orders"}>Orders</Link>
              </li>
              <li className="text-stone-400">
                <Link href={"/dashboard/transaction"}>Transactions</Link>
              </li>
            </ul>
          </li>
        ) : (
          ""
        )}

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
    </div>
  );
};

export default Sidebar;
