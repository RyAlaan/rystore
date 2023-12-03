import Button from "@/components/elements/Button";
import Message from "@/components/fragments/Message";
import React, { useEffect, useState } from "react";

interface imageDataType {
  name: string;
  label: string;
  file: File | null;
  imageName: string;
  hidden: boolean;
}

const CrateImageLayout = () => {
  const [success, setSuccess] = useState<string>("");
  const [failed, setFailed] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
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
    setLoading(false);
  };

  const handleImageSubmit = async (e: any) => {
    e.preventDefault();
    setSuccess("");
    setFailed("");
    setLoading(true);

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
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(imageLinks);
  }, [imageLinks]);

  return (
    <div className="px-10 mt-10 w-full">
      <Message success={success} failed={failed} />
      <form
        encType="multipart/form-data"
        method="POST"
        onSubmit={handleImageSubmit}
      >
        {imageData.map((field, index) => (
          <label className="" key={index}>
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
              className={`border-2 w-40 aspect-video border-dashed rounded-md flex-col justify-center items-center ${
                field.hidden ? "hidden" : "flex"
              }`}
            >
              {field.file ? (
                <img
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
        <Button
          type="submit"
          value="upload"
          className="w-fit px-5 py-3 text-white rounded-sm"
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default CrateImageLayout;
