import { productType } from "@/types/productType";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import SearchBox from "@/components/fragments/SearchBox";
import CardProduct from "./CardProduct";
import clsx from "clsx";
import Button from "@/components/elements/Button";
import Input from "@/components/elements/Input";

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
    router.push(`/dashboard/products?name=${value}`);
  };

  return (
    <div className="w-[calc(100%-72px)] h-screen md:h-[calc(100vh-66px)] bg-white self-end overflow-hidden">
      <div className="flex flex-row justify-between px-4 w-full pt-5 gap-x-10 ">
        <form
          action="POST"
          className={clsx(
            "flex overflow-hidden flex-row text-sm max-w-sm border-2 rounded-full"
          )}
          onSubmit={(e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              search: { value: string };
            };
            handleSearch(target.search.value);
          }}
        >
          <Button type="submit" className="bg-white rounded-none px-2">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-primary"
            />
          </Button>
          <Input
            type="text"
            placeholder="Search products"
            className="rounded-none py-1 w-full max-w-sm"
          />
        </form>
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
              (category === "All" ? "" : `?category=${category.toLowerCase()}`)
            }
            className="bg-slate-100 text-black rounded-b-full rounded-r-full items-center w-fit flex flex-row px-4 py-1 gap-x-2"
          >
            <p>{category}</p>
          </Link>
        ))}
      </div>
      <div className="w-full flex flex-wrap justify-betwen gap-5 py-8 px-4 h-[calc(100vh-100px)] md:h-[calc(100vh-200px)] overflow-y-auto">
        {products?.map((product: productType, index: number) => (
          <CardProduct key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsDashboard;
