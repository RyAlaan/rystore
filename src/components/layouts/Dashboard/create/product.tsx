import Form from "@/components/fragments/Form";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/elements/Button";
import SelectInput from "@/components/fragments/Select";
import Image from "next/image";

interface imageDataType {
  name: string;
  label: string;
  file: File | null;
  imageName: string;
  hidden: boolean;
}

const CreateProductLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [imageData, setImageData] = useState<imageDataType[]>([
    {
      name: "image1",
      label: "Image 1",
      file: null,
      imageName: "",
      hidden: false,
    },
    {
      name: "image2",
      label: "Image 2",
      file: null,
      imageName: "",
      hidden: true,
    },
    {
      name: "image3",
      label: "Image 3",
      file: null,
      imageName: "",
      hidden: true,
    },
    {
      name: "image4",
      label: "Image 4",
      file: null,
      imageName: "",
      hidden: true,
    },
    {
      name: "image5",
      label: "Image 5",
      file: null,
      imageName: "",
      hidden: true,
    },
    {
      name: "image6",
      label: "Image 6",
      file: null,
      imageName: "",
      hidden: true,
    },
  ]);

  const handleInputChange = (e: any, index: number) => {
    setIsLoading(true);
    console.log("Input event:", e);
    const updatedImageData = [...imageData];

    const fileInput = e.target;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      console.log(file);

      updatedImageData[index].file = file;

      const rawUrl = URL.createObjectURL(file);
      const parts = rawUrl.split("/");
      const fileName = parts[parts.length - 1];

      updatedImageData[index].imageName = fileName;

      if (index < updatedImageData.length - 2) {
        updatedImageData[index + 1].hidden = false;
      } else {
        updatedImageData[index + 1].hidden = true;
      }

      setImageData(updatedImageData);
    } else {
      console.error("Invalid file input");
    }
    setIsLoading(false);
  };

  const handleCreateProduct = async (event: any) => {
    event.preventDefault();
    setSuccess("");
    setError("");
    setIsLoading(true);

    const formData = new FormData();

    imageData.forEach((field, index) => {
      if (field.file) {
        formData.append(`file_${index}`, field.file);
        formData.append(`imageName_${index}`, field.imageName);
      }
    });

    formData.append("folder", "images/products");

    try {
      const result = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });

      const response = await result.json();
      console.log(response);
      setImageLinks(response.data);
      
      if (response.statusCode === 200) {
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
            imageLinks[0],
            imageLinks[1],
            imageLinks[2],
            imageLinks[3],
            imageLinks[4],
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
        console.log(response);
        if (response.status === 200) {
          setSuccess("Product added successfully");
        } else {
          setError(response.message);
        }
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(imageLinks);
  }, [imageLinks]);

  // const handleCreateProduct = async (event: any) => {
  //   event.preventDefault();
  //   setIsLoading(true);
  //   setSuccess("");
  //   setError("");
  //   const discount =
  //     event.target.isDiscount.value === "true"
  //       ? event.target.discount.value
  //       : null;
  //   const data = {
  //     name: event.target.name.value,
  //     price: parseInt(event.target.price.value),
  //     category: event.target.category.value,
  //     stock: parseInt(event.target.stock.value),
  //     isDiscount: event.target.isDiscount.value ? true : false,
  //     discount: parseInt(discount),
  //     description: event.target.description.value,
  //     people: 0,
  //     images: [
  //       event.target.image1.value,
  //       event.target.image2.value,
  //       event.target.image3.value,
  //       event.target.image4.value,
  //       event.target.image5.value,
  //     ],
  //   };
  //   const result = await fetch("/api/products", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   const response = await result.json();
  //   if (response.status === 200) {
  //     setSuccess(response.message);
  //   } else {
  //     setError(response.message);
  //   }

  //   setIsLoading(false);
  // };

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
          <label className="flex md:flex-row gap-x-3" key={index}>
            {" "}
            <input
              type="file"
              name={field.name}
              accept="image/*"
              required={index === 0}
              className="hidden"
              onChange={(event) => handleInputChange(event, index)}
            />
            <div
              className={`border-2 w-40 aspect-video border-dashed rounded-md flex-col justify-center items-center lg:flex-row gap-x-3 ${
                field.hidden ? "hidden" : "flex"
              }`}
            >
              {field.file ? (
                <Image
                  src={URL.createObjectURL(field.file)}
                  alt=""
                  className="w-full"
                />
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
