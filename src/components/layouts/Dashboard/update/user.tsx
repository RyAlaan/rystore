import { use, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import useSWR from "swr";

import { fetcher } from "@/lib/swr/fetcher";
import Button from "@/components/elements/Button";
import Form from "@/components/fragments/Form";
import Link from "next/link";
import SelectInput from "@/components/fragments/Select";

const UpdateUserLayout = () => {
  const [success, setSuccess] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const route = useRouter();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    image: "",
  });

  const { data, isLoading, error } = useSWR(
    "/api/users/" + route.query.user,
    fetcher
  );

  console.log(data?.data);

  useEffect(() => {
    if (data?.data) {
      setUser({
        firstname: data.data.firstname,
        lastname: data.data.lastname,
        address: data.data.address,
        phone: data.data.phone,
        image: data.data.image,
      });
    }
  }, [data]);

  console.log(user);

  const handleUpdateUser = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setSuccess("");
    setIsError("");
    const data = {
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      fullname:
        event.target.firstname.value + " " + event.target.lastname.value,
      role: event.target.role.value,
      address: event.target.address.value,
      phone: event.target.phone.value,
      image: event.target.image.value,
    };
    console.log(data);
    const result = await fetch("/api/users/" + route.query.user, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    switch (result.status) {
      case 200:
        setSuccess("Data added successfully");
        break;

      case 400:
        setIsError("data is undefined");
        break;

      case 404:
        setIsError("user not found");
        break;

      case 405:
        setIsError("method not allowed");
        break;

      default:
        setIsError("something wrong");
        break;
    }
    setLoading(false);
  };

  isLoading && <div className="">wait...</div>;

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
      <form action="PUT" className="py-6" onSubmit={handleUpdateUser}>
        <div className="flex flex-col md:flex-row justify-between gap-x-14">
          <Form
            type="text"
            name="firstname"
            label="First Name"
            className="w-full md:w-1/2"
            value={user.firstname}
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
          />
          <Form
            type="text"
            name="lastname"
            label="Last Name"
            className="w-full md:w-1/2"
            value={user.lastname}
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
          />
        </div>
        <SelectInput name="role" id="role" label="Role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </SelectInput>
        <Form
          type="text"
          name="address"
          label="Address"
          className="w-full"
          value={user.address}
          onChange={(e) => setUser({ ...user, address: e.target.value })}
        />
        <Form
          type="tel"
          pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
          name="phone"
          label="Phone"
          title="Enter a phone number in the format (1234)-5678901"
          className="w-full"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
        <Form
          type="text"
          name="image"
          label="Image"
          className="w-full"
          value={user.image}
          onChange={(e) => setUser({ ...user, image: e.target.value })}
        />

        <div className="flex flex-row pt-5 gap-x-3 w-full justify-between">
          <Link
            href="/dashboard/users"
            className="bg-secondary text-white px-5 py-3 rounded-sm"
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Back
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
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserLayout;
