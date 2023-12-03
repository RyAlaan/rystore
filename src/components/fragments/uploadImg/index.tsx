import Button from "@/components/elements/Button";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface imageModalType {
  className?: string;
  id?: string;
  imageRoute?: string;
  firestoreRoute?: string;
}

const ImageModal = (props: imageModalType) => {
  const { className, id, imageRoute, firestoreRoute } = props;
  const [success, setSuccess] = useState<string>("");
  const [failed, setFailed] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [imageData, setImageData] = useState({
    name: "image1",
    label: "Image 1",
    file: null,
    imageName: "",
  });

  const handleInputChange = (e: any) => {
    setLoading(true);
    console.log("Input event:", e);

    const fileInput = e.target;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      imageData.file = file

      const rawUrl = URL.createObjectURL(file);
      const parts = rawUrl.split("/");
      const fileName = parts[parts.length - 1];

      imageData.imageName = fileName;

    } else {
      console.error("Invalid file input");
    }
    setLoading(false);
  };

  // const handleImageSubmit = async (e: any) => {
  //   e.preventDefault();
  //   setSuccess("");
  //   setFailed("");
  //   setLoading(true);

  //   const formData = new FormData();

  //   imageData.forEach((field, index) => {
  //     if (field.file) {
  //       formData.append(`file_${index}`, field.file);
  //       formData.append(`imageName_${index}`, field.imageName);
  //     }
  //   });

  //   formData.append("folder", "images/products");

  //   try {
  //     const result = await fetch("/api/images", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const response = await result.json();
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error uploading images:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    console.log(imageLinks);
  }, [imageLinks]);

  return (
    <div
      id={id}
      className={clsx(
        className,
        `px-20 py-12 w-fit border-4 rounded-md self-center bg-slate-100`
      )}
    >
      <form
        encType="multipart/form-data"
        method="POST"
        onSubmit={() => {}}
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
    </div>
  );
};

export default ImageModal;
