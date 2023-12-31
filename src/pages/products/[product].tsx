import { fetcher } from "@/lib/swr/fetcher";
import { productType } from "@/types/productType";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Button from "@/components/elements/Button";
import ProductDescription from "@/components/layouts/product/ProductDescription";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";

const ProductDetail = () => {
  const { query } = useRouter();
  const [product, setProduct] = useState<productType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

   const { data, isLoading, error } = useSWR(
     `/api/products/${query.product}`,
     fetcher
   );


  useEffect(() => {
    if (data?.data) {
      setProduct(data.data);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex flex-col font-poppins">
        <div className="lg:px-32 flex flex-col lg:flex-row justify-between">
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
    if (!session) {
      router.push("/auth/login");
      return;
    }
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const cartData = {
      userId: session?.user.id,
      productId: product?.id,
      quantity: quantity,
    };
    const result = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartData),
    });

    const response = await result.json();
    if (response.status == 200) {
      redirect("/cart")
    } else {
      setErrorMessage(response.message);
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col font-poppins">
      <div className="px-4 gap-y-5 gap-x-5 lg:pb-14 lg:px-12 mt-16 md:mt-0 flex flex-col lg:flex-row">
        <div className="w-full gap-x-5 gap-y-5 flex flex-col-reverse md:flex-row  pb-5 border-b-2 lg:border-0">
          <div className="sideImage md:h-[510px] overflow-auto overflow-y-hidden md:overflow-hidden md:overflow-y-auto gap-x-2 flex flex-row- md:flex-col gap-y-4 w-fit">
            {product && product.images ? (
              product.images.map((image, index) =>
                image !== "" ? (
                  <img
                    src={image}
                    alt=""
                    key={index}
                    className="w-20 aspect-square rounded-md overflow-hidden hover:scale-110 duration-300 cursor-pointer"
                  />
                ) : (
                  <div key={index}></div>
                )
              )
            ) : (
              <div></div>
            )}
          </div>
          <div className="mainImage ">
            <img
              src={product?.images?.[0] ? product?.images?.[0] : ""}
              alt=""
              className="w-[510px] aspect-square rounded-xl overflow-hidden"
            />
          </div>
        </div>
        <div className="description lg:w-3/4">
          {product && product.description ? (
            <ProductDescription product={product} />
          ) : (
            ""
          )}
          <div className="flex flex-col">
            <div className="py-3 flex flex-row justify-between">
              <div className="flex flex-row rounded-md overflow-hidden">
                <button
                  className="py-2 px-3 border hover:border-secondary hover:text-white hover:bg-secondary"
                  onClick={decreaseValue}
                >
                  -
                </button>
                <div className="py-2 px-6 border-y items-center justify-center">
                  {quantity}
                </div>
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
                className="px-3 py-2 border rounded-md hover-bg-secondary"
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
