import Form from "@/components/fragments/Form";
import { fetcher } from "@/lib/swr/fetcher";
import { cartType } from "@/types/cartType";
import { productType } from "@/types/productType";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
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
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [success, setSuccess] = useState<string>("");
  const [failed, setFailed] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
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

  // useEffect(() => {
  //   setSubTotal(
  //     quantities.map(
  //       (quantity, index) => productData[index].price * quantities[index]
  //     )
  //   );
  // }, [quantities]);

  useEffect(() => {
    setSubTotal(
      quantities.map((quantity, index) => {
        const product = productData[index];
        const discount = product && product.discount ? product.discount : 0;

        if (discount > 0) {
          return (product.price - (discount / 100) * product.price ) * quantities[index];
        } else {
          return product.price * quantities[index];
        }
      })
    );
  }, [quantities, productData]);

  const toggleAllItems = () => {
    const allIndexes = productData.map((_, index) => index);
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(allIndexes);
    }
    setSelectAll(!selectAll);
  };

  const toggleItem = (index: number) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter((item) => item !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };

  const updateCart = async () => {
    setLoading(true);
    let i = 0;
    for (const item of cartData) {
      const result = await fetch("/api/cart/" + item.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...item,
          quantity: quantities[i],
        }),
      });
      i++;

      const response = await result.json();
      if (result.status === 200) {
        setSuccess(response.message);
      } else {
        setFailed(response.message);
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedItems.length !== productData.length) {
      setSelectAll(false);
    } else {
      setSelectAll(true);
    }
  }, [selectedItems, productData]);

  const selectedSubTotal = selectedItems.reduce((acc, index) => {
    const product = productData[index];
    const quantity = quantities[index];
    const discount = product && product.discount ? product.discount : 0;

    if (discount > 0) {
      return (
        acc +(product.price - (discount / 100) * product.price) * quantity
      );
    } else {
      return product.price * quantity;
    }
  }, 0);

  useEffect(() => {
    setTotalPrice(selectedSubTotal + shipping);
  }, [selectedSubTotal, shipping]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    const result = await fetch(`/api/cart/${id}`, {
      method: "DELETE",
    });

    const response = await result.json();
    if (result.status == 200) {
      window.location.reload();
      setSuccess(response.message);
    } else {
      setFailed(response.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col font-poppins">
      <div className="lg:px-8 flex flex-col justify-between gap-y-3">
        <div
          className={clsx(
            "text-center self-center border-2 rounded-md px-6 py-2",
            success || failed ? "flex" : "hidden",
            success && "text-green-500 border-green-500",
            failed && "text-red-500 border-red-500"
          )}
        >
          {success || failed}
        </div>
        <div className="flex flex-col gap-y-20 w-full lg:pb-36">
          <div className="flex flex-col w-full md:gap-y-6">
            <div className="flex flex-col w-full lg:gap-y-10">
              <div className="flex justify-between w-full px-10 py-6 shadow-sm">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleAllItems}
                />
                <p>Product</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Subtotal</p>
                <p>Action</p>
              </div>
              {productData.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between w-full px-10 py-6 shadow-sm items-center"
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(index)}
                    onChange={() => toggleItem(index)}
                  />
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
                  <button onClick={() => handleDelete(cartData[index].id)}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="bg-secondary text-white p-3 rounded-md"
                    ></FontAwesomeIcon>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between w-full">
              <Link href={"/"} className="border-2 px-12 py-4">
                Return To Shop
              </Link>
              <button onClick={updateCart} className="border-2 px-12 py-4">
                Update Cart
              </button>
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
                <p>
                  {selectedSubTotal.toLocaleString("en-EN", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="flex flex-row justify-between py-3 border-y">
                <p>Shipping</p>
                <p>
                  {shipping == 0
                    ? "Free"
                    : shipping.toLocaleString("en-EN", {
                        style: "currency",
                        currency: "USD",
                      })}
                </p>
              </div>
              <div className="flex flex-row justify-between py-3">
                <p>Total:</p>
                <p>
                  {totalPrice.toLocaleString("en-EN", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
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
