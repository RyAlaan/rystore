import { useRouter } from "next/router";

const checkoutPage = () => {
  const router = useRouter()

  console.log(router.query.orderCode);
  

  return (
    <div className="px-2 lg:px-8 flex flex-col justify-between gap-y-3"></div>
  );
};

export default checkoutPage;
