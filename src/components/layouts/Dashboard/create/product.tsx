import Form from "@/components/fragments/Form";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/elements/Button";
import SelectInput from "@/components/fragments/Select";

const CreateProductLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [imageData, setImageData] = useState([
    {
      name: "image1",
      label: "Image 1",
      value: null,
      hidden: false,
      fileName: "",
      filePath: "",
    },
    {
      name: "image2",
      label: "Image 2",
      value: null,
      hidden: true,
      fileName: "",
      filePath: "",
    },
    {
      name: "image3",
      label: "Image 3",
      value: null,
      hidden: true,
      fileName: "",
      filePath: "",
    },
    {
      name: "image4",
      label: "Image 4",
      value: null,
      hidden: true,
      fileName: "",
      filePath: "",
    },
    {
      name: "image5",
      label: "Image 5",
      value: null,
      hidden: true,
      fileName: "",
      filePath: "",
    },
    {
      name: "imageBuangan",
      label: "Image 5",
      value: null,
      hidden: true,
      fileName: "",
      filePath: "",
    },
  ]);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [file, setFile] = useState<File | null>();

  const handleInputChange = (event: any, index: number) => {
    const { value } = event.target;
    const file = event.target.files[0];
    const updatedImageData = [...imageData];

    updatedImageData[index].name = file;

    const rawUrl = URL.createObjectURL(file);
    const parts = rawUrl.split("/");
    const fileName = parts[parts.length - 1];

    updatedImageData[index].filePath = rawUrl;
    updatedImageData[index].fileName = fileName;

    if (value && index < updatedImageData.length - 2) {
      updatedImageData[index + 1].hidden = false;
    } else {
      updatedImageData[index + 1].hidden = true;
    }
    // const { value } = event.target;
    // const updatedImageData = [...imageData];

    // updatedImageData[index].value = value;

    // if (value && index < updatedImageData.length - 2) {
    //   updatedImageData[index + 1].hidden = false;
    // } else {
    //   updatedImageData[index + 1].hidden = true;
    // }

    // const file = event.target.files[0];

    // setImageData(updatedImageData);
  };
  //   (e) => {
  //   if (e.target.files) {
  //     const file = e.target.files[0];
  //     setSelectedImage(URL.createObjectURL(file));
  //     setFile(file);
  //   }
  // }

  const handleCreateProduct = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setSuccess("");
    setError("");
    const discount =
      event.target.isDiscount.value === "true"
        ? event.target.discount.value
        : null;
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
    const result = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await result.json();
    if (response.status === 200) {
      setSuccess(response.message);
    } else {
      setError(response.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full lg:w-5/6 flex flex-col py-6 px-5 font-poppins">
      {success && (
        <div className="w-fit rounded-md text-green-600 self-center px-10 py-2 border-2 border-green-500">
          <p>{success}</p>
        </div>
      )}
      {error && (
        <div className="w-fit rounded-md text-red-600 self-center px-10 py-2 border-2 border-red-500">
          <p>{error}</p>
        </div>
      )}
      <form className="py-6" onSubmit={handleCreateProduct}>
        <div className="flex flex-col md:flex-row w-full justify-between gap-x-4">
          <Form
            type="text"
            name="name"
            label="Product Name"
            className="w-full md:w-1/3"
            required={true}
          />
          <Form
            type="number"
            name="price"
            label="Price"
            className="w-full md:w-1/3"
            min={0}
            required={true}
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
          />
          {/* if isDiscount is true, discount enable */}
        </div>
        <Form
          type="number"
          name="stock"
          label="Stock"
          min={0}
          required={true}
        />
        {/* cannot be negative */}
        {/* <Form type="textarea" name="description" label="Description" /> */}
        <textarea
          name="description"
          id="description"
          className="border border-[#ccc] rounded-md w-full mb-4 text-black px-2"
          placeholder="Image description"
        ></textarea>
        {imageData.map((field, index) => (
          <label
            key={index}
            className={field.hidden ? "hidden" : "flex flex-row gap-x-4"}
          >
            <input
              type="file"
              name={field.name}
              accept="image/*"
              hidden
              onChange={(e) => {
                handleInputChange(e, index);
              }}
            />
            <div className="border-2 w-40 aspect-video border-dashed rounded-md flex flex-col justify-center items-center">
              {field && field.fileName && field.fileName[index] ? (
                <img src={field.fileName[index]} alt="" className="w-full" />
              ) : (
                <span>Select Image</span>
              )}
            </div>
          </label>
        ))}
        {/* max image link 5 */}
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
              {isLoading ? "loading..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProductLayout;
