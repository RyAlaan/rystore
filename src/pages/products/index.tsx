import { useEffect, useState } from "react";
import { productType } from "@/types/productType";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import { useRouter } from "next/router";
import CardProduct from "@/components/layouts/Dashboard/products/CardProduct";

const ProductPage = () => {
  const [products, setProducts] = useState<productType[]>([]);
  const { query } = useRouter();
  const newLink =
    query &&
    Object.entries(query)
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join("&");

  const { data, isLoading, error } = useSWR(
    "/api/products?" + newLink.toString(),
    fetcher
  );

  useEffect(() => {
    if (data?.data) {
      setProducts(data.data);
    }
  }, [data]);

  return (
    <div className="w-full flex flex-wrap justify-between gap-5 py-4 px-8 mt-10 md:mt-0 h-[calc(100vh-40px)] md:h-[calc(100vh-100px)] overflow-y-auto">
      {products?.map((product: productType, index: number) => (
        <CardProduct key={index} product={product} />
      ))}
    </div>
  );
};

export default ProductPage;
