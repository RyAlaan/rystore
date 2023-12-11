import { productType } from "@/types/productType";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import SearchBox from "@/components/fragments/SearchBox";
import Card from "@/components/fragments/Card/Card";
import CardProduct from "./CardProduct";

const ProductsDashboard = ({ products }: { products: productType[] }) => {
  const router = useRouter();

  const categories = [
    "All",
    "Camera",
    "Cellphone",
    "Computer",
    "Gamepad",
    "Headphone",
    "Smartwatch",
  ];

  const handleSearch = (value: string) => {
    router.push(`/dashboard/products?q=${value}`);
  };

  return (
    //min-w-[calc(100%-72px)]
    <div className="w-full min-h-[calc(100vh-75px)]">
      <div className="flex flex-col w-full bg-white border-b">
        <div className="flex flex-row justify-between px-4 w-full pt-5 gap-x-10">
          <SearchBox
            placeholder="Search products"
            className="w-full rounded-full border-2"
          />
          <Link
            href={"/dashboard/create/product"}
            className="border border-black text-black rounded-full items-center flex flex-row px-4 gap-x-2"
          >
            <p className="hidden md:flex">Add product</p>
            <FontAwesomeIcon icon={faPlus} className="aspect-square" />
          </Link>
        </div>
        <div className="w-full overflow-auto flex flex-row gap-x-6 py-4 pl-4 ">
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
        </div>
      </div>
      <div className="w-full flex flex-wrap justify-betwen gap-5 py-8 px-4 ">
        {products?.map((product: productType, index: number) => (
          <CardProduct key={index} product={product} />
        ))}
        {products?.map((product: productType, index: number) => (
          <CardProduct key={index} product={product} />
        ))}
        {products?.map((product: productType, index: number) => (
          <CardProduct key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsDashboard;
