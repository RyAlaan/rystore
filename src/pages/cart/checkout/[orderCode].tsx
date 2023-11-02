// import Form from "@/components/fragments/Form";
// import { useRouter } from "next/router";

import { useRouter } from "next/router";

// const checkoutPage = () => {
//   const router = useRouter()

//   console.log(router.query.orderCode);

//   return (
//     <form className="px-2 lg:px-8 flex flex-col justify-between gap-y-3">
//       <div className="">
//         <h1>Billing Details</h1>
//         <Form
//           type="number"
//           name="price"
//           label="Price"
//           className="w-full md:w-1/3"
//           min={0}
//           required={true}
//         />{" "}
//       </div>
//       <div className=""></div>
//     </form>
//   );
// };


const checkoutPage = () => {
  const router = useRouter();

  return (
    <form className="px-2 lg:px-8 flex flex-col justify-between gap-y-3"></form>
  );
};

  export default checkoutPage;
