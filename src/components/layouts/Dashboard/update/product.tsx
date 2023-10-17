import Form from "@/components/fragments/Form";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/elements/Button";
import SelectInput from "@/components/fragments/Select";
import { useRouter } from "next/router";
import { fetcher } from "@/lib/swr/fetcher";
import useSWR from "swr";
import { productType } from "@/types/productType";

const UpdateProductLayout = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [isError, setIsError] = useState("");
  const router = useRouter();
  console.log(router.query.product);

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    category: "camera",
    stock: 0,
    isDiscount: false,
    discount: 0,
    description: "",
    people: 0,
    images: ["", "", "", "", ""],
  });

  const { data, isLoading, error } = useSWR(
    "/api/products/" + router.query.product,
    fetcher
  );
  console.log(data?.data);

  useEffect(() => {
    if (data?.data) {
      setProduct({
        name: data.data.name,
        price: data.data.price,
        category: data.data.category,
        stock: data.data.stock,
        isDiscount: data.data.isDiscount,
        discount: data.data.discount,
        description: data.data.description,
        people: data.data.people,
        images: [
          data.data.images[0],
          data.data.images[1],
          data.data.images[2],
          data.data.images[3],
          data.data.images[4],
        ],
      });
    }
  }, [data]);

  console.log(product);

  const handleUpdateProduct = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setSuccess("");
    setIsError("");
    const discount =
      event.target.isDiscount.value === "true"
        ? event.target.discount.value
        : 0;
    const data = {
      name: event.target.name.value,
      price: parseInt(event.target.price.value),
      category: event.target.category.value,
      stock: parseInt(event.target.stock.value),
      isDiscount: event.target.isDiscount.value ? true : false,
      discount: parseInt(discount),
      description: event.target.description.value,
      people: 0,
      images: [
        event.target.image1.value,
        event.target.image2.value,
        event.target.image3.value,
        event.target.image4.value,
        event.target.image5.value,
      ],
    };
    const result = await fetch("/api/products/" + router.query.product, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      setSuccess("Data added successfully");
    } else {
      setIsError(
        result.status === 405 ? "method not allowed" : "something wrong"
      );
    }

    setLoading(false);
  };

  return (
    <div className="w-full lg:w-5/6 flex flex-col py-6 px-5 font-poppins">
      {success && (
        <div className="w-fit rounded-md text-green-600 self-center px-10 py-2 border-2 border-green-500">
          <p>{success}</p>
        </div>
      )}
      {isError && (
        <div className="w-fit rounded-md text-red-600 self-center px-10 py-2 border-2 border-red-500">
          <p>{isError}</p>
        </div>
      )}
      <form className="py-6" onSubmit={handleUpdateProduct}>
        <div className="flex flex-col md:flex-row w-full justify-between gap-x-4">
          <Form
            type="text"
            name="name"
            label="Product Name"
            className="w-full md:w-1/3"
            value={product.name}
            onChange={(e: any) =>
              setProduct({ ...product, name: e.target.value })
            }
          />
          <Form
            type="number"
            name="price"
            label="Price"
            className="w-full md:w-1/3"
            min={0}
            value={product.price}
            onChange={(e: any) =>
              setProduct({ ...product, price: e.target.value })
            }
          />
          {/* cannot be negative*/}
          <SelectInput
            name="category"
            id="category"
            label="Category"
            className="w-full md:w-1/3"
          >
            <option value="camera">Camera</option>
            <option value="computer">Computer</option>
            <option value="smartphone">Smartphone</option>
            <option value="headphone">Headphone</option>
            <option value="Gamepad">Gamepad</option>
            <option value="SmartWatch">Smartwatch</option>
          </SelectInput>
          {/* Camera, Smartphone, Computer, headphone, Gamepad, SmartWatch*/}
        </div>
        <div className="flex flex-col md:flex-row w-full justify-between gap-x-4">
          <SelectInput
            name="isDiscount"
            id="isDiscount"
            label="Is Discount ?"
            className="w-full md:w-1/2"
          >
            <option value={"true"}>true</option>
            <option value={"false"}>false</option>
          </SelectInput>
          {/* true or false */}
          <Form
            type="number"
            name="discount"
            label="Discount"
            className="w-full md:w-1/2"
            min={0}
            max={100}
            required={product.isDiscount}
            value={product.discount}
            onChange={(e: any) =>
              setProduct({ ...product, discount: e.target.value })
            }
          />
          {/* if isDiscount is true, discount enable */}
        </div>
        <Form
          type="number"
          name="stock"
          label="Stock"
          min={0}
          value={product.stock}
          onChange={(e: any) =>
            setProduct({ ...product, stock: e.target.value })
          }
        />
        {/* cannot be negative*/}
        <Form
          type="textarea"
          name="description"
          label="Description"
          value={product.description}
          onChange={(e: any) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
        {product.images.map((image, index) => (
          <Form
            type="text"
            name={"image" + index + 1}
            label={"image" + index + 1}
            key={index}
            value={image}
            onChange={(e: any) =>
              setProduct({ ...product, images: e.target.value })
            }
          />
        ))}
        <div className="flex flex-row pt-5 gap-x-3 w-full justify-between">
          <Link
            href={"/dashboard/users"}
            className="bg-secondary text-white px-5 py-3 rounded-sm"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> back
          </Link>
          <div className="flex flex-row">
            <Button
              type="reset"
              className="w-fit px-5 py-3 bg-white text-black"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-fit px-5 py-3 text-white rounded-sm"
            >
              {loading ? "loading..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductLayout;
