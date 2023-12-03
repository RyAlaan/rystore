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

  const { data, error, isLoading } = useSWR("/api/products?discount=true", fetcher);

  useEffect(() => {
    setProducts(data?.data);
  }, []);

  return (
    <>
      <div className="" id="FlashSale">
        <SectionTitle>Today's</SectionTitle>
        <div className="pt-2 flex items-end justify-between">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            Flash Sales
          </h1>
          <Countdown targetDate={"10/6/23 12:00:00"} />
        </div>
      </div>
      <div className="overflow-x-auto w-full">
        <div className="pt-8 flex flex-row gap-x-6 w-max pb-8">
          {data?.data.map((product: productType, index: number) => (
            <Card key={index} product={product} />
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center py-16">
        <Link
          href="/"
          className="bg-secondary text-white px-4 py-3 md:px-8 md:py-4 justify-self-center rounded-md"
        >
          View All Products
        </Link>
        {/* Ntar jangan lupa di ganti hrefnya */}
      </div>
    </>
  );
};

export default FlashSale;
