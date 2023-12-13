import { deleteDataById } from "@/lib/firebase/service";
import { productType } from "@/types/productType";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CardProduct = ({
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
    <div className="w-44 py-3 h-fit flex flex-col items-center border gap-y-2 rounded-2xl px-4">
      <div className="w-36 aspect-square overflow-hidden rounded-2xl">
        <img
          src={product.images ? product.images[0] : "https://placehold.co/56"}
          alt=""
          className="aspect-square object-cover w-full"
        />
      </div>
      <div className="w-full flex flex-col">
        <Link
          href={`/dashboard/update/product/${product.id}`}
          className="line-clamp-1 font-semibold w-full"
        >
          {product.name}
        </Link>
        <div className="flex flex-row gap-x-3">
          <p
            className={product.isDiscount ? "line-through text-slate-500" : ""}
          >
            {product.price.toLocaleString("en-EN", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          {product.discount && (
            <p className="text-secondary">
              {(product.price * (product.discount / 100)).toLocaleString(
                "en-EN",
                {
                  style: "currency",
                  currency: "USD",
                }
              )}
            </p>
          )}
        </div>
        <div className="flex flex-row justify-between pt-2">
          <div className="w-full">
            <p>
              stock{" "}
              <span
                className={clsx(
                  "font-semibold",
                  product.stock === 0
                    ? "text-red-500"
                    : product.stock <= 10
                    ? "text-yellow-500"
                    : ""
                )}
              >
                {product.stock}
              </span>
            </p>
          </div>
          <div
            className="flex flex-col items-center justify-center bg-secondary text-white w-8 rounded-md aspect-square cursor-pointer"
            onClick={() => deleteFunction(product.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
