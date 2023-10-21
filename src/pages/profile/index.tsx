import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";
import Header from "@/components/layouts/Breadcumb";
import Sidebar from "@/components/layouts/Sidebar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const UpdateUserPage: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // const handleChanges = async (e: any) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError("");
  //   try {
  //     // const res = await
  //   } catch (error) {}
  // };

  return (
    <div>
      <div className="flex flex-row justify-center">
        <Sidebar />
        <div className="lg:w-5/6 px-8 py-6 lg:py-10 lg:px-20 flex flex-col justify-center gap-y-4"></div>
      </div>
    </div>
  );
};

export default UpdateUserPage;
