import SectionTitle from "@/components/elements/SectionTitle";
import Card from "@/components/fragments/Card/Card";
import { fetcher } from "@/lib/swr/fetcher";
import { productType } from "@/types/productType";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

const ProductsSection = () => {
  const [products, setProducts] = useState<productType[] | null>(null);

  const { data, error, isLoading } = useSWR(
    "/api/products",
    fetcher
  );

  useEffect(() => {
    setProducts(data?.data);
    console.log(data?.data);
  }, [data]);


  isLoading && (
    <p>Laoding...</p>
  )

  return (
    <>
      <SectionTitle>Our Products</SectionTitle>
      <div className="pt-2 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          View Our Products
        </h1>
      </div>
      <div className="pt-8 flex flex-row gap-x-6">
        {products?.map((product: productType, index: number) => (
          <Card key={index} product={product} />
        ))}
      </div>
      <div className="w-full flex justify-center pt-16">
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

export default ProductsSection;
