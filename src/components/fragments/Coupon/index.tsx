import { useState } from "react";
import Form from "../Form";

const Coupon = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <form className="flex flex-row md:justify-between lg:justify-normal gap-x-4 w-full">
      <Form
        type="string"
        name="Coupon Code"
        label="Coupon Code"
        className="w-full h-full md:w-1/3"
        required={true}
      />{" "}
      <button
        type="submit"
        className="h-full lg:h-fit md:px-12 md:py-3 text-white rounded-sm bg-secondary text-md"
      >
        {" "}
        {isLoading ? (
          <p className="text-md md:text-xl">Loading...</p>
        ) : (
          <p className="text-md md:text-xl">Apply Coupon</p>
        )}
      </button>
    </form>
  );
};

export default Coupon;
