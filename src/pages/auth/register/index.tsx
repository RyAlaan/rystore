import Button from "@/components/elements/Button";
import Form from "@/components/fragments/Form";
import AuthLayout from "@/components/layouts/AuthLayout";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterPage = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    const data = {
      email: event.target.email.value,
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      fullname: event.target.firstname.value + " " + event.target.lastname.value,
      password: event.target.password.value,
    };
    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError(
        result.status === 400 ? "email already exist" : "something wrong"
      );
    }
  };

  return (
    <div className="flex items-center justify-center overflow-hidden font-poppins h-screen w-full">
      <div className="flex flex-row-reverse items-center justify-center w-full">
        <AuthLayout>
          <>
            {error && <p className="text-center text-red-600">{error}</p>}
            <form
              className="flex justify-center align-center flex-col gap-x-8 w-96 mt-4"
              onSubmit={handleRegister}
            >
              <div className="flex justify-between gap-x-2">
                <Form
                  className="w-full"
                  type="text"
                  label="First Name"
                  name="firstname"
                  required={true}
                />
                <Form
                  className="w-full"
                  type="type"
                  label="Last Name"
                  required={true}
                  name="lastname"
                />
              </div>
              <Form
                className="w-full"
                type="email"
                label="Email"
                name="email"
                required={true}
              />
              <Form
                className="w-full"
                type="password"
                name="password"
                label="Password"
                required={true}
              />
              <Button
                type="submit"
                className="text-center text-bold px-4 py-3 rounded-sm"
              >
                Sign Up
              </Button>
            </form>
          </>
        </AuthLayout>
      </div>
    </div>
  );
};

export default RegisterPage;
