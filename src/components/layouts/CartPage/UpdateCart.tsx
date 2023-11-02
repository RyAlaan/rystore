import Link from "next/link";

const UpdateCart = ({ updateCart }: { updateCart: () => void }) => {
  return (
    <div className="flex justify-between w-full">
      <Link href={"/"} className="border-2 px-12 py-4">
        Return To Shop
      </Link>
      <button onClick={updateCart} className="border-2 px-12 py-4">
        Update Cart
      </button>
    </div>
  );
};

export default UpdateCart;
