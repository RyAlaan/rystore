import Input from "@/components/elements/Input";
import { useRouter } from "next/router";

const checkoutPage = () => {
  const router = useRouter()

  console.log(router.query.orderCode);
  

  return (
    <form className="px-2 lg:px-8 flex flex-col justify-between gap-y-3">
      <div className="">
        <h1>Billing Details</h1>
        {/* <Input type="text" placeholder="Full Name" name="fullname" className="bg-[#F5F5F5]"></Input> */}
        
      </div>
      <div className=""></div>
    </form>
  );
};

export default checkoutPage;
