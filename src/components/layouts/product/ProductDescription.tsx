import useShowText from "@/hooks/useShowText";
import useTotalPrice from "@/hooks/useTotalPrice";
import { productType } from "@/types/productType";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useEffect, useState } from "react";

const ProductDescription = ({ product }: { product: productType }) => {
  const { textShow, isShowMore, toggleText } = useShowText(product.description);
  const [totalPrice, setTotalPrice] = useState<number>(product.price);

  useEffect(() => {
    if (product.isDiscount && product.discount !== undefined) {
      const discountedPrice =
        product.price - (product.discount / 100) * product.price;
      setTotalPrice(discountedPrice);
    }
  }, []);

  return (
    <div className="flex flex-col gap-y-1 border-b-4 pb-6">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <div className="rating flex flex-row gap-x-2">
        <div className="stars">
          <FontAwesomeIcon icon={faStar} className="text-[#FFAD33]" />
          <FontAwesomeIcon icon={faStar} className="text-[#FFAD33]" />
          <FontAwesomeIcon icon={faStar} className="text-[#FFAD33]" />
          <FontAwesomeIcon icon={faStar} className="text-[#FFAD33]" />
          <FontAwesomeIcon icon={faStar} className="text-neutral-400" />
        </div>
        <p className="text-neutral-400">
          {"(" + product.people + " Reviews )"} |{" "}
        </p>
        {product ? (
          product.stock > 10 ? (
            <p className="text-green-500">in stock</p>
          ) : product.stock > 0 ? (
            <p className="text-yellow-400">{product.stock} Remaining</p>
          ) : (
            <p className="text-red-500">out of stock</p>
          )
        ) : (
          <p className="text-red-500">Product not found</p>
        )}
      </div>
      <div className="checkDiscount flex flex-row gap-x-2">
        <h4
          className={clsx(
            product.isDiscount ? "line-through text-neutral-400" : "",
            "text-xl"
          )}
        >
          {product.price.toLocaleString("en-EN", {
            style: "currency",
            currency: "USD",
          })}
        </h4>
        {product.isDiscount && (
          <h4 className="text-xl text-secondary">
            {totalPrice.toLocaleString("en-EN", {
              style: "currency",
              currency: "USD",
            })}
          </h4>
        )}
      </div>
      <p className="text-justify">{textShow}</p>
      <span className="inline-block">
        {" "}
        <button onClick={toggleText} className="text-sky-400">
          {isShowMore ? "Show Less" : "Show More"}
        </button>
      </span>
    </div>
  );
};

export default ProductDescription;
