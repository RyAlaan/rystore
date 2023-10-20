import Button from "@/components/elements/Button";
import Form from "@/components/fragments/Form";
import { fetcher } from "@/lib/swr/fetcher";
import { cartType } from "@/types/cartType";
import { productType } from "@/types/productType";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

const CartPage = () => {
  const [cartData, setCartData] = useState<cartType[]>([]);
  const [productData, setProductData] = useState<productType[]>([]);
  const [subTotal, setSubTotal] = useState<number[]>([]);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [shipping, setShipping] = useState<number>(0);
  const { data: session } = useSession();

  const { data, error, isLoading } = useSWR(
    "/api/cart/" + session?.user?.id,
    fetcher
  );

  useEffect(() => {
    if (data?.data?.cartData) {
      setCartData(data.data.cartData);
      setQuantities(data.data.cartData.map((item: cartType) => item.quantity));
    }
  }, [data]);

  useEffect(() => {
    if (data?.data?.productData) {
      setProductData(data.data.productData);
    }
  }, [data]);

  const increaseValue = (index: number) => {
    if (quantities[index] < productData[index].stock) {
      setQuantities((prev) => {
        const updatedQuantities = [...prev];
        updatedQuantities[index] += 1;
        return updatedQuantities;
      });
    }
  };

  const decreaseValue = (index: number) => {
    if (quantities[index] > 1) {
      setQuantities((prev) => {
        const updatedQuantities = [...prev];
        updatedQuantities[index] -= 1;
        return updatedQuantities;
      });
    }
  };

  useEffect(() => {
    setSubTotal(
      quantities.map((quantity, index) => productData[index].price * quantities[index])
    )
  }, [quantities])

  console.log(subTotal);
  

  return (
    <div className="flex flex-col font-poppins">
      <div className="lg:px-8 flex justify-between">
        <div className="flex flex-col gap-y-20 w-full lg:pb-36">
          <div className="flex flex-col w-full md:gap-y-6">
            <div className="flex flex-col w-full lg:gap-y-10">
              <div className="flex justify-between w-full px-10 py-6 shadow-sm">
                <p>Product</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Subtotal</p>
              </div>
              {productData.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between w-full px-10 py-6 shadow-sm items-center"
                >
                  <div className="flex flex-row gap-x-2 items-center">
                    <img
                      src={product.images[0]}
                      alt=""
                      className="h-14 rounded-sm"
                    />
                    <Link
                      href={"/products/" + product.id}
                      className="align-center"
                    >
                      {product.name.length > 15
                        ? product.name.slice(0, 12) + "..."
                        : product.name}
                    </Link>
                  </div>
                  <div className="">
                    {product.price.toLocaleString("en-EN", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </div>
                  <div className="">
                    <div className="flex flex-row rounded-md overflow-hidden">
                      <button
                        className="py-2 px-3 border hover:border-secondary hover:text-white hover:bg-secondary"
                        onClick={() => {
                          decreaseValue(index);
                        }}
                      >
                        -
                      </button>
                      <div className="py-2 px-6 border-y">
                        <p>{quantities[index].toString()}</p>
                      </div>
                      <button
                        className="py-2 px-3 border hover:border-secondary hover:text-white hover:bg-secondary"
                        onClick={() => {
                          increaseValue(index);
                        }}
                      >
                        +
                      </button>
                    </div>{" "}
                  </div>
                  <div className="">
                    <div className="">
                      {subTotal[index] !== undefined
                        ? subTotal[index].toLocaleString("en-EN", {
                            style: "currency",
                            currency: "USD",
                          })
                        : "N/A"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between w-full">
              <Link href={"/"} className="border-2 px-12 py-4">
                Return To Shop
              </Link>
              <Link href={"/"} className="border-2 px-12 py-4">
                Update Cart
              </Link>
            </div>
          </div>
          <div className="flex flex-row justify-between w-full gap-x-44">
            <form action="" className="flex flex-row  gap-x-4 w-full">
              <Form
                type="string"
                name="Coupon Code"
                label="Coupon Code"
                className="w-full h-full md:w-1/3"
                required={true}
              />{" "}
              <button
                type="submit"
                className="px-12 py-3 h-fit text-white rounded-sm bg-secondary text-md"
              >
                {" "}
                {isLoading ? "loading..." : "Apply Coupon"}
              </button>
            </form>
            <div className="flex flex-col border-2 rounded-lg py-8 px-6 w-full">
              <p className="bold pb-3">Cart Total</p>
              <div className="flex flex-row justify-between py-3">
                <p>SubTotal</p>
                <p>$1233</p>
              </div>
              <div className="flex flex-row justify-between py-3 border-y">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <div className="flex flex-row justify-between py-3">
                <p>Total:</p>
                <p>$1233</p>
              </div>
              <button className="px-12 py-4 self-center text-white bg-secondary rounded-md">
                Process To Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
