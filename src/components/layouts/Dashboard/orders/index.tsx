import SearchBox from "@/components/fragments/SearchBox";
import { orderType } from "@/types/orderType";

interface ordersDashboardType {
  orders: orderType[];
}

const OrdersDashboard = (props: ordersDashboardType) => {
  const { orders } = props;

  return (
    <div className="w-[calc(100%-72px)] h-screen md:h-[calc(100vh-66px)] bg-white self-end overflow-hidden">
        <div className="flex flex-row justify-between px-4 w-full py-5 gap-x-10 ">
          <SearchBox
            placeholder="Search orders"
            className="w-full rounded-full border-2"
          />
        </div>
        {/* <div className="w-full overflow-auto flex flex-row gap-x-6 py-4 pl-4 ">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={
                "/dashboard/products" +
                (category === "All"
                  ? ""
                  : `?category=${category.toLowerCase()}`)
              }
              className="bg-slate-100 text-black rounded-b-full rounded-r-full items-center w-fit flex flex-row px-4 py-1 gap-x-2"
            >
              <p>{category}</p>
            </Link>
          ))}
        </div> */}
      {/* <div className="w-full flex flex-wrap justify-betwen gap-5 py-8 px-4">
        {products?.map((product: productType, index: number) => (
          <CardProduct key={index} product={product} />
        ))}
      </div> */}
    </div>
  );
};

export default OrdersDashboard;
