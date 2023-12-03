import Button from "@/components/elements/Button";
import Form from "@/components/fragments/Form";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

const AuthLayout = (props: { children: React.ReactElement }) => {
  const { children } = props;
  const router = useRouter();
  
  return (
    <>
      <div className="hidden lg:flex w-1/2 pt-6">
        <img
          width={1000}
          height={1000}
          src={`/images/SideImage.jpg`}
          alt=""
          className="w-full"
        />
      </div>
      <div className="w-full flex flex-col align-middle justify-center h-screen lg:h-[100%] lg:w-1/2">
        <div className="flex-flex-col w-fit self-center">
          {router.pathname === "/auth/login" && (
            <h2 className="text-4xl font-bolder self-center">
              Login to your account
            </h2>
          )}
          {router.pathname === "/auth/register" && (
            <h2 className="text-4xl font-bolder">Create an account</h2>
          )}
          <p className="py-4">Enter your detail below</p>
          {children}
          <div className="text-center pt-8 text-slate-400">
            {router.pathname === "/auth/login" && (
              <p>
                Dont have an account ?
                <Link
                  href={"/auth/register"}
                  className="text-underline text-black"
                >
                  {" "}
                  Register
                </Link>
              </p>
            )}
            {router.pathname === "/auth/register" && (
              <p>
                already have an account ?
                <Link
                  href={"/auth/login"}
                  className="text-underline text-black"
                >
                  {" "}
                  Login
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
