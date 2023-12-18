import Countdown from "../../fragments/Countdown";
import Link from "next/link";
import SectionTitle from "@/components/elements/SectionTitle";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import Card from "@/components/fragments/Card/Card";
import { productType } from "@/types/productType";

const FlashSale = () => {
  const [products, setProducts] = useState([]);

  const { data, error, isLoading } = useSWR("/api/products?isDiscount=true", fetcher);
  
  useEffect(() => {
    setProducts(data?.data);
  }, [data]);

  return (
    <>
      <div className="flex flex-col gap-y-5" id="FlashSale">
        <SectionTitle>Today&apos;s</SectionTitle>
        <div className="pt-2 flex flex-col lg:flex-row lg:items-center justify-between gap-y-2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            Flash Sales
          </h1>
          <Countdown targetDate={"1/18/24 12:00:00"} />
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <div className="pt-8 flex flex-row gap-x-6 w-max pb-8">
          {data?.data.map((product: productType, index: number) => (
            <Card key={index} product={product} />
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center py-6">
        <Link
          href="/products"
          className="bg-secondary text-white px-4 py-3 md:px-8 md:py-4 justify-self-center rounded-md"
        >
          View All Products
        </Link>
      </div>
    </>
  );
};

export default FlashSale;
