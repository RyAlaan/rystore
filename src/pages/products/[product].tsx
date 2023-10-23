import { fetcher } from "@/lib/swr/fetcher";
import { productType } from "@/types/productType";
import { faCartPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";
import useSWR from "swr";
import useTotalPrice from "../../hooks/useTotalPrice";
import useShowText from "../../hooks/useShowText";
import Button from "@/components/elements/Button";
import ProductDescription from "@/components/layouts/product/ProductDescription";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const ProductDetail = () => {
  const { query } = useRouter();
  const [product, setProduct] = useState<productType | null>(null); // use null as the default value
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("")
  const { data: session } = useSession();
  console.log(session?.user);
  
  const { data, isLoading, error } = useSWR(
    `/api/products/${query.product}`,
    fetcher
  );

    console.log(data);
    

  useEffect(() => {
    if (data?.data) {
      setProduct(data.data);
      if (data.data.isDiscount && data.data.discount !== undefined) {
        const discountedPrice =
          data.data.price - (data.data.discount / 100) * data.data.price;
        setTotalPrice(discountedPrice);
      }
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex flex-col font-poppins">
        <div className="mt-12 py-8 lg:px-32 flex flex-col lg:flex-row justify-between">
          <p className="text-center">Loading ...</p>
        </div>
      </div>
    );
  }

  const increaseValue = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseValue = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  async function handleAddToCart() {
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");
    console.log(data?.data.id);
    
    const cartData = {
      user_id: session?.user.id,
      product_id: data.data.id,
      quantity : quantity,
      totalPrice: totalPrice * quantity,
    };
    const result = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    });
  
    const response = await result.json();
    if (response.status === 200) {
      setSuccessMessage(response.message);
    } else {
      setErrorMessage(response.message);
    }
    
    console.log(cartData);
    
    setLoading(false);
  }


  return (
    <div className="flex flex-col font-poppins">
      <div className="mt-12 py-8 lg:px-32 flex flex-col lg:flex-row justify-between">
        <div className="sideImage flex flex-row md:flex-col gap-y-4 w-fit">
          {product?.images.map((image, index) => (
            <img
              src={image}
              alt=""
              key={index}
              className="w-20 aspect-square rounded-md overflow-hidden"
            />
          ))}
        </div>
        <div className="mainImage">
          <img
            src={product?.images[0]}
            alt=""
            className="w-[510px] aspect-square rounded-xl overflow-hidden"
          />
        </div>
        <div className="description lg:w-1/3">
          {isLoading ? "" : <ProductDescription product={data.data} />}
          <div className="flex flex-col">
            <div className="py-3 flex flex-row justify-between">
              <div className="flex flex-row rounded-md overflow-hidden">
                <button
                  className="py-2 px-3 border hover:border-secondary hover:text-white hover:bg-secondary"
                  onClick={decreaseValue}
                >
                  -
                </button>
                <div className="py-2 px-6 border-y">{quantity}</div>
                <button
                  className="py-2 px-3 border hover:border-secondary hover:text-white hover:bg-secondary"
                  onClick={increaseValue}
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                type="submit"
                className="px-6 py-2 text-white"
              >
                Add To Cart{" "}
                <FontAwesomeIcon icon={faCartPlus} className="text-white" />
              </Button>
              <button
                type="submit"
                className="px-3 py-2 border rounded-md hover:bg-secondary"
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className="group-hover:text-white"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
