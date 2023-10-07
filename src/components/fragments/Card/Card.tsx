import { productType } from "@/types/productType";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { title } from "process";
import { useEffect, useState } from "react";

const Card = ({ product }: { product: productType }) => {
  // const { image, discount, title, price, people, rating, product.isDiscount } = props;

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (product.isDiscount && product.discount !== undefined) {
      const discountedPrice =
        product.price - (product.discount / 100) * product.price;
      setTotalPrice(discountedPrice);
    } else {
      setTotalPrice(product.price);
    }
  }, [product.isDiscount, product.price, product.discount]);

  return (
    <div className="w-28 md:w-48 container">
      <div className="rounded-md overflow-hidden relative">
        <img
          src={product.images[0]}
          alt=""
          className="rounded-md w-full aspect-square object-cover"
        />
        {product.isDiscount && (
          <div
            id="discount"
            className="bg-secondary rounded-md text-white w-fit p-1 text-xs absolute top-2 left-2 z-10"
          >
            <p>-{product.discount}%</p>
          </div>
        )}
      </div>
      <div className="pt-2">
        <Link
          href={`/products/${product.id}`}
          className="text-sm overflow-hidden text-ellipsis whitespace-nowrap w-[calc(100%-1rem)]"
          id="title"
        >
          {product.name}
        </Link>
        <div className="flex flex-row gap-x-2">
          <p className="text-sm text-secondary" id="count">
            {product.discount
              ? totalPrice.toLocaleString("en-EN", {
                  style: "currency",
                  currency: "USD",
                })
              : "" }
          </p>
          {product.discount && (
            <p className="text-sm text-slate-500 line-through" id="price">
              {product.price.toLocaleString("en-EN", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          )}
        </div>
        <div className="rating flex flex-row justify-between pr-4">
          <div className="flex felx-row items-center gap-x-2">
            <FontAwesomeIcon icon={faStar} className="text-[#FFAD33]" />
            <p className="text-sm text-gray-500">{product.rating}</p>
          </div>
          <div className="">
            <p className="text-sm text-gray-500">{product.people}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
