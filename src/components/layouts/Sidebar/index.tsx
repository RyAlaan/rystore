import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar : React.FC = () => {
    const router = useRouter();

    // console.log(router);
    

    return (
      <div className="sidebar w-1/6 hidden lg:flex">
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
      </div>
    );
}

export default Sidebar