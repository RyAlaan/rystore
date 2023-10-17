import Button from "@/components/elements/Button";
import Form from "@/components/fragments/Form";
import AuthLayout from "@/components/layouts/AuthLayout";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();

  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";

  const handleLogin = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", {
        // redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError(res.error);
        setError("Password or email is incorrect");
      }
    } catch (error: any) {
      setIsLoading(false);
      setError("Password or email is incorrect");
    }
  };

  return (
    <div className="flex items-center justify-center overflow-hidden font-poppins h-fit w-full">
      <div className="flex items-center justify-center w-full">
        <AuthLayout>
          <>
          {error && <p className="text-center text-red-600">{error}</p>}
          <form
            className="flex justify-center align-center flex-col gap-x-8 w-96 mt-4"
            onSubmit={handleLogin}
          >
            <Form
              className="w-full"
              type="email"
              name="email"
              label="Email"
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
              className="text-center text-bold px-4 py-3 rounded-sm text-white"
              
            >
              Sign In
            </Button>
          </form>
          </>
        </AuthLayout>
      </div>
    </div>
  );
};

export default LoginPage;
