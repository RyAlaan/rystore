import { useState } from "react";
import Form from "../Form";

const Coupon = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <form action="" className="flex flex-row  gap-x-4 w-full">
      <Form
        type="string"
        name="Coupon Code"
        label="Coupon Code"
        className="w-full h-full md:w-1/3"
        required={true}
      />{" "}
      <button
        type="submit"
        className="px-12 py-3 h-fit text-white rounded-sm bg-secondary text-md"
      >
        {" "}
        {isLoading ? "loading..." : "Apply Coupon"}
      </button>
    </form>
  );
};

export default Coupon;
