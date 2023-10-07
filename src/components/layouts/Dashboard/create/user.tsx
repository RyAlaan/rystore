import Button from "@/components/elements/Button";
import Form from "@/components/fragments/Form";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";

const CreateUserLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleCreateUser = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setSuccess("");
    setError("");
    const data = {
      email: event.target.email.value,
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      fullname:
        event.target.firstname.value + " " + event.target.lastname.value,
      password: event.target.password.value,
      address: event.target.address.value,
      phone: event.target.phone.value,
      image:
        Date.now().toString() +
        "_" +
        event.target.email.value.split("@")[0] +
        ".jpg",
    };
    const result = await fetch("/api/users/[user]", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      setSuccess("Data added successfully");
    } else {
      if (result.status === 400) {
        setError("email already exist");
      } else {
        setError(
          result.status === 405 ? "method not allowed" : "something wrong"
        );
      }
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
      <form action="PUT" className="py-6" onSubmit={handleCreateUser}>
        <div className="flex flex-col md:flex-row justify-between gap-x-14">
          <Form
            type="text"
            name="firstname"
            label="First Name"
            className="w-full md:w-1/2"
          />
          <Form
            type="text"
            name="lastname"
            label="Last Name"
            className="w-full md:w-1/2"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-x-14">
          <Form
            type="email"
            name="email"
            label="Email"
            className="w-full md:w-1/2"
          />
          <Form
            type="password"
            name="password"
            label="Password"
            className="w-full md:w-1/2"
          />
        </div>
        <Form type="text" name="address" label="Address" />
        <Form
          type="tel"
          pattern="\(\d\d\d\d\)-\d\d\d\d\d\d\d"
          name="phone"
          label="Phone"
        />
        <label className="">
          <input
            type="file"
            name="image"
            hidden
            onChange={({ target }) => {
              if (target.files) {
                const file = target.files[0];
                setSelectedImage(URL.createObjectURL(file));
                setSelectedFile(file);
              }
            }}
          />
          <div className="border-2 w-40 aspect-video border-dashed rounded-md flex flex-col justify-center items-center">
            {selectedImage ? (
              <img src={selectedImage} alt="" className="w-full" />
            ) : (
              <span>Select Image</span>
            )}
          </div>
        </label>
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
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUserLayout;
