import { productType } from "@/types/productType";
import TableProducts from "./TableProducts";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ProductsDashboard = ({ products }: { products: productType[] }) => {
  return (
    <div className="w-5/6 flex flex-col py-6 px-5 font-poppins">
      <div className="w-full flex justify-end">
        <Link
          href={"/dashboard/create/product"}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add User <FontAwesomeIcon icon={faPlus} />
        </Link>
      </div>
      <div className="w-full  rounded-md px-2 py-2 flex flex-row justify-between">
        <div className="image w-14 text-center">
          <p className="text-md font-semibold">Image</p>
        </div>
        <div className="w-40 h-full flex flex-col justify-center text-center">
          <p className="text-md font-semibold">Name</p>
        </div>
        <div className="w-20 h-full flex flex-col justify-center text-center">
          <p className="text-md font-semibold">Price</p>
        </div>
        <div className="w-16 h-full flex flex-col justify-center text-center">
          <p className="text-md font-semibold">Stocks</p>
        </div>
        <div className="w-20 h-full flex flex-col justify-center text-center">
          <p className="text-md font-semibold">isDiscount</p>
        </div>
        <div className="w-14 h-full flex flex-col justify-center text-center">
          <p className="text-md font-semibold">Discount</p>
        </div>
        <div className="w-28 h-full flex flex-col justify-center text-center">
          <p className="text-md font-semibold">Rating</p>
        </div>
        <div className="w-28 h-full flex flex-col justify-center text-center">
          <p className="text-md font-semibold">Actions</p>
        </div>
      </div>
      <div className="h-96 overflow-auto">
        {products.map((product, index) => (
          <TableProducts
            key={index}
            product={product}
            className={index % 2 === 1 ? "" : "bg-neutral-200"}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsDashboard;
