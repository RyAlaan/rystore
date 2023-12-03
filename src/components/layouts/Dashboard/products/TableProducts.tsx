import { deleteDataById } from "@/lib/firebase/service";
import { productType } from "@/types/productType";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const TableProducts = ({
  product,
  className,
}: {
  product: productType;
  className?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const deleteFunction = async (id: string) => {
    setLoading(true);
    const result = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (result.status === 200) {
      window.location.reload();
      setSuccess("Data deleted successfully");
    } else {
      setError(
        result.status === 405 ? "method not allowed" : "something wrong"
      );
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
      <div className="image w-14">
        <img
          src={product.images ? product.images[0] : "https://placehold.co/56"}
          className="object-cover"
          alt=""
        />
      </div>
      <div className="w-40 h-full flex flex-col justify-center">
        <p className="h-full line-clamp-2 ">{product.name}</p>
      </div>
      <div className="w-20 h-full flex flex-col justify-center text-center">
        <p className="text-md ">
          {product.price.toLocaleString("en-EN", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
      <div className="w-16 h-full flex flex-col justify-center text-center">
        <p>{product.stock}</p>
      </div>
      <div className="w-20 h-full flex flex-col justify-center text-center">
        <p>{product!.isDiscount?.toString()}</p>
      </div>
      <div className="w-14 h-full flex flex-col justify-center text-center">
        <p>{product!.discount?.toString()}</p>
      </div>
      <div className="w-28 h-full flex flex-col justify-center text-center">
        <p>{product.rating}</p>
      </div>
      <div className="w-28 flex flex-row justify-between text-center p-2 ">
        <Link
          href={`/dashboard/update/product/${product.id}`}
          className="bg-blue-600 rounded-md aspect-square flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faEdit} className="text-white" />
        </Link>
        <button
          onClick={() => deleteFunction(product.id)}
          className="bg-red-600 rounded-md aspect-square flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faTrash} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default TableProducts;
