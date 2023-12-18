import Button from "@/components/elements/Button";
import Message from "@/components/fragments/Message";
import { fetcher } from "@/lib/swr/fetcher";
import { orderType } from "@/types/orderType";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

const OrderPage = () => {
  const { data: session } = useSession();
  const [orderData, setOrderData] = useState<orderType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [failed, setFailed] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [imageData, setImageData] = useState({
    name: "image1",
    label: "Image 1",
    file: null,
    imageName: "",
  });

  const handleInputChange = (e: any) => {
    setLoading(true);

    const fileInput = e.target;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      imageData.file = file;

      const rawUrl = URL.createObjectURL(file);
      const parts = rawUrl.split("/");
      const fileName = parts[parts.length - 1];

      imageData.imageName = fileName;
    } else {
      console.error("Invalid file input");
    }
    setLoading(false);
  };

  const handleImageSubmit = async (e: any) => {
    e.preventDefault();
    setSuccess("");
    setFailed("");
    setLoading(true);

    const formData = new FormData();

    if (imageData.file) {
      formData.append("file", imageData.file);
      formData.append("imageName", imageData.imageName);
    }

    formData.append("folder", "images/orders");

    try {
      const result = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });

      const response = await result.json();

      if (response.data[0]) {
        try {
          const data = orderData.find((order) => order.id === orderId);

          if (
            data &&
            data.orderStatus === "Awaiting Payment" &&
            data.image === null
          ) {
            data.image = response.data[0];
            data.orderStatus = "Awaiting Confirmation";

            const result = await fetch(`/api/orders/${orderId}`, {
              method: "PUT",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (result.status === 200) {
              setSuccess("Image Uploaded Successfully");
              setImageModalVisible(!isImageModalVisible);
            }
          } else {
            setFailed("Failed to update data");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const { data, error, isLoading } = useSWR(
    "/api/orders/" + session?.user?.id,
    fetcher
  );

  useEffect(() => {
    setOrderData(data?.data?.orderData);
  }, [data]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    setSuccess("");
    setFailed("");

    const data = orderData.find((order) => order.id === id);

    if (data && data.orderStatus === "Awaiting Payment") {
      data.orderStatus = "Canceled";
    }

    const result = await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await result.json();
    if (result.status == 200) {
      window.location.reload();
      setSuccess("Order Canceled");
    } else {
      setFailed(response.message);
    }

    setLoading(false);
  };

  const handleImage = (id: string) => {
    setImageModalVisible(!isImageModalVisible);
    setOrderId(id);
  };

  return (
    <div className="flex flex-col w-full font-poppins px-2 lg:px-8 mt-12 md:mt-0 gap-y-5 bg-white">
      <Message success={success} failed={failed} />
      <div
        className={clsx(
          `px-20 py-12 w-fit border-4 rounded-md self-center bg-slate-100 absolute`,
          isImageModalVisible ? "z-40" : "-z-20"
        )}
      >
        <form
          encType="multipart/form-data"
          method="POST"
          onSubmit={(event) => handleImageSubmit(event)}
          className="flex flex-col gap-y-10"
        >
          <label className="">
            {" "}
            <input
              type="file"
              name={imageData.name}
              accept="image/*"
              required={true}
              className="hidden"
              onChange={(event) => handleInputChange(event)}
            />
            <div
              className={`border-2 border-secondary w-40 aspect-video border-dashed rounded-md flex flex-col justify-center items-center `}
            >
              {imageData.file ? (
                <img
                  src={URL.createObjectURL(imageData.file)}
                  alt=""
                  className="w-full"
                />
              ) : (
                <span>Select Image</span>
              )}
            </div>
          </label>
          <Button
            type="submit"
            value="upload"
            className="w-fit px-5 py-3 text-white rounded-sm self-center"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </div>{" "}
      <div className="flex flex-col w-full overflow-x-auto">
        <div className="flex px-10 py-6 shadow-sm gap-x-2 bg-white w-[1264px]">
          <p className="w-20 text-center">Num</p>
          <p className="w-44 text-center">Order Code</p>
          <p className="w-44 text-center">Full Name</p>
          <p className="w-44 text-center">Order Status</p>
          <p className="w-44 text-center">Proof of Payment</p>
          <p className="w-44 text-center">Total Price</p>
          <p className="w-44 text-center">Actions</p>
        </div>
        <div className="flex flex-col px-10 py-6 shadow-sm gap-x-2 bg-white w-[1264px]">
          {orderData &&
            orderData.map((order, index) => (
              <div
                key={index}
                className="flex w-full py-6 shadow-sm gap-x-2 items-center"
              >
                <p className="w-20 text-left">{index + 1}</p>
                <p className="w-44 text-center">{order.orderCode}</p>
                <p className="w-44 text-center">{session?.user.fullname}</p>
                <p className="w-44 text-center">{order.orderStatus}</p>
                <div className="w-44 text-center flex justify-center">
                  {order.image !== null ? (
                    <img
                      src={order.image}
                      alt=""
                      className="h-14 rounded-sm "
                    />
                  ) : (
                    <div className="h-14"></div>
                  )}
                </div>
                <p className="w-44 text-center">
                  {order.totalPrice.toLocaleString("en-EN", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
                <div className="w-44 justify-center items-center text-center gap-x-5 flex flex-row">
                  {order.orderStatus === "Awaiting Payment" && (
                    <button onClick={() => handleImage(order.id)}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="bg-blue-600 text-white p-3 rounded-md"
                      />
                    </button>
                  )}
                  {order.orderStatus === "Awaiting Payment" ||
                  order.orderStatus === "Canceled" ? (
                    <button onClick={() => handleDelete(order.id)}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="bg-secondary text-white p-3 rounded-md"
                      ></FontAwesomeIcon>
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
