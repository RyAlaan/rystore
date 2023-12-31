import Coupon from "@/components/fragments/Coupon";
import Message from "@/components/fragments/Message";
import CartCard from "@/components/layouts/CartPage/CartCard";
import UpdateCart from "@/components/layouts/CartPage/UpdateCart";
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
  const [selectedSubTotal, setSelectedSubTotal] = useState<number>(0);
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

  const toggleAllItems = () => {
    const allIndexes = productData.map((product, index) => index);
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

  useEffect(() => {
    setSubTotal(
      quantities.map((quantity, index) => {
        const product = productData[index];
        const discount = product && product.discount ? product.discount : 0;

        if (discount > 0) {
          return (
            (product.price - (discount / 100) * product.price) *
            quantities[index]
          );
        } else {
          return product.price * quantities[index];
        }
      })
    );
  }, [quantities, productData]);

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
    }
    setLoading(false);
  };

  useEffect(() => {
    if (
      selectedItems.length !== productData.length ||
      productData.length == 0
    ) {
      setSelectAll(false);
    } else {
      setSelectAll(true);
    }
  }, [selectedItems, productData]);

  useEffect(() => {
    const subTotalArray: number[] = [];
    selectedItems.map((index) => {
      subTotalArray.push(subTotal[index]);
    });
    setSelectedSubTotal(subTotalArray.reduce((a, b) => a + b, 0));
  }, [selectedItems, subTotal]);

  useEffect(() => {
    const total: number[] = [];
    selectedItems.forEach((item) => {
      total.push(subTotal[item]);
    });

    setSelectedSubTotal(total.reduce((acc, item) => acc + item, 0));
    const roundedPrice = totalPrice.toFixed(2);

    setTotalPrice(selectedSubTotal + shipping);
  }, [selectedItems, shipping, selectedSubTotal, subTotal, totalPrice]);

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

  const handleCheckout = async () => {
        const randNum = Math.floor(Math.random() * 1000000000);

        const selectedCart = selectedItems.map((index) => {
          if (selectedItems.length == 0) {
            setFailed("Please Select Product");
          } else {
            return cartData[index];
          }
        });

        const selectedSubTotal = selectedItems.map((index) => {
          if (selectedItems.length == 0) {
            setFailed("Please Select Product");
          } else {
            return subTotal[index];
          }
        });
        setLoading(true);
        const result = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderCode: "RY" + randNum,
            userId: session?.user?.id,
            orderStatus: "Awaiting Payment",
            totalPrice: totalPrice,
            image: null,
          }),
        });
        if (result.status == 200) {
          let curIdx = 0;
          for (const cart of selectedCart) {
            const resDetail = await fetch("/api/orders/orderDetail", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderCode: "RY" + randNum,
                productId: cart?.productId,
                quantity: cart?.quantity,
                subTotal: selectedSubTotal[curIdx],
              }),
            });
            curIdx++;
            resDetail.status;
            if (resDetail.status == 200) {
              const resDelete = await fetch("/api/cart/" + cart?.id, {
                method: "DELETE",
              });
              if (resDelete.status == 200) {
                setSuccess("Checkout Success");
              } else {
                setFailed("failed delete cart");
              }
            } else {
              setFailed("failed create order detail");
            }
          }
        } else {
          setFailed("failed create order");
        }
    setLoading(false);
  };

  return (
    <div className="flex flex-col font-poppins">
      <div className="px-2 lg:px-8 flex flex-col justify-between gap-y-3 mt-12 md:mt-0">
        <Message success={success} failed={failed} />
        <div className="flex flex-col gap-y-20 w-full pb-10 lg:pb-36">
          <div className="flex flex-col w-full gap-y-6">
            <div className="flex flex-col w-full gap-y-6 lg:gap-y-10">
              <div className="flex justify-between w-full px-10 py-6 shadow-sm gap-x-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={toggleAllItems}
                />
                <div className="hidden lg:flex lg:justify-between lg:w-full">
                  <p className="w-44 text-center">Product</p>
                  <p className="w-44 text-center">Price</p>
                  <p className="w-44 text-center">Quantity</p>
                  <p className="w-44 text-center">Subtotal</p>
                  <p className="w-44 text-center">Action</p>
                </div>
                <div className="lg:hidden">
                  <p>Product Detail</p>
                </div>
              </div>
              {productData.map((product, index) => (
                <div
                  key={index}
                  className="flex w-full px-10 py-6 shadow-sm items-center gap-x-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(index)}
                    onChange={() => toggleItem(index)}
                  />
                  <div className="hidden lg:flex lg:justify-between lg:w-full">
                    <div className="flex flex-row gap-x-2 items-center w-44">
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
                    <div className="flex gap-x-2 items-center w-44">
                      <p
                        className={clsx(
                          product.isDiscount === true
                            ? "line-through text-neutral-400"
                            : ""
                        )}
                      >
                        {product.price.toLocaleString("en-EN", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </p>
                      {product.isDiscount === true &&
                      product.discount !== undefined ? (
                        <div className="flex gap-x-2 items-center justify-center">
                          <div className="bg-red-300 text-red-700 font-bold rounded-sm p-1 text-sm">
                            {product.discount}%
                          </div>
                          <p>
                            {(
                              product.price -
                              (product.discount / 100) * product.price
                            ).toLocaleString("en-EN", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex flex-row items-center justify-center w-44">
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
                    <div className="flex flex-row items-center justify-center w-44">
                      <p className="text-center">
                        {subTotal[index] !== undefined
                          ? subTotal[index].toLocaleString("en-EN", {
                              style: "currency",
                              currency: "USD",
                            })
                          : "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-row items-center justify-center w-44">
                      <button onClick={() => handleDelete(cartData[index].id)}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="bg-secondary text-white p-3 rounded-md"
                        ></FontAwesomeIcon>
                      </button>
                    </div>
                  </div>
                  <div className="lg:hidden flex flex-row justify-between w-full">
                    <div className="flex flex-col justify-between gap-x-2">
                      <img
                        src={product.images[0]}
                        alt=""
                        className="h-16 w-16 rounded-sm"
                      />
                      <div className="">
                        <div className="text-md font-semibold text-center">
                          {subTotal[index] !== undefined
                            ? subTotal[index].toLocaleString("en-EN", {
                                style: "currency",
                                currency: "USD",
                              })
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-1/2 justify-end items-end">
                      <div className="flex flex-col">
                        <Link
                          href={"/products/" + product.id}
                          className="align-center line-clamp-2"
                        >
                          {product.name}
                        </Link>
                        <div className="flex gap-x-2 items-center justify-center">
                          <p
                            className={clsx(
                              product.isDiscount === true
                                ? "line-through text-neutral-400"
                                : "text-secondary"
                            )}
                          >
                            {product.price.toLocaleString("en-EN", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </p>
                          {product.isDiscount === true &&
                          product.discount !== undefined ? (
                            <div className="flex gap-x-2 items-center">
                              <div className="bg-red-300 text-red-700 font-bold rounded-sm p-1 text-sm">
                                {product.discount}%
                              </div>
                              <p>
                                {(
                                  product.price -
                                  (product.discount / 100) * product.price
                                ).toLocaleString("en-EN", {
                                  style: "currency",
                                  currency: "USD",
                                })}
                              </p>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="flex row items-center gap-x-3">
                        <div className="flex flex-row rounded-md overflow-hidden">
                          <button
                            className="py-2 px-3 text-sm border hover:border-secondary hover:text-white hover:bg-secondary"
                            onClick={() => {
                              decreaseValue(index);
                            }}
                          >
                            -
                          </button>
                          <div className="py-2 px-6 text-sm border-y">
                            <p>{quantities[index].toString()}</p>
                          </div>
                          <button
                            className="py-2 px-3 text-sm border hover:border-secondary hover:text-white hover:bg-secondary"
                            onClick={() => {
                              increaseValue(index);
                            }}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleDelete(cartData[index].id)}
                          className="align-bottom"
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="bg-secondary text-white p-3 rounded-md"
                          ></FontAwesomeIcon>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <UpdateCart updateCart={updateCart} />
          </div>
          <div className="flex flex-col lg:flex-row justify-between w-full gap-y-4 px-4 lg:gap-x-44">
            <Coupon />
            <CartCard
              totalPrice={totalPrice}
              shipping={shipping}
              selectedSubTotal={selectedSubTotal}
              onClick={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
