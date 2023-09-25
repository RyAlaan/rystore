import SectionTitle from "@/components/elements/SectionTitle";
import Card from "@/components/fragments/Card/Card";
import { productType } from "@/types/productType";
import Link from "next/link";

const BestProduct = () => {
  const cards: productType[] = [
    {
      image:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/bf461a6e-17f0-468a-a61a-2a74cafdb0d9/lebron-xx-ep-basketball-shoes-nPKcbs.png",
      title: "Lebron XX premium EP",
      price: 230,
      rating: 4.5,
      people: 100,
    },
    {
      image:
        "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1d1f5c94-5180-4e0f-ac6c-38acf984158a/giannis-immortality-3-ep-basketball-shoes-0dTCk5.png",
      title: "Giannis Immortality 3 EP",
      price: 230,
      rating: 4.5,
      people: 100,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk2wO7kVqXXkwDOAF8hGUHUAJqIQvd_qdLew&usqp=CAU",
      title: "Ferrari Diecast",
      price: 230,
      rating: 4.5,
      people: 100,
    },
    {
      image:
        "https://images.tokopedia.net/img/cache/900/hDjmkQ/2023/6/13/d90a5201-cb64-42d4-b360-162a6eafd1c7.jpg",
      title: "Fanatec Podium Racing Wheel",
      price: 230,
      rating: 4.5,
      people: 100,
    },
    {
      image:
        "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/dd34fbc6-398a-435d-a350-010dbd123c25/phantom-luna-football-boot-8VB9rp.png",
      title: "Nike Phantom Luna",
      price: 230,
      rating: 4.5,
      people: 100,
    },
  ];

  return (
    <div className="">
      <SectionTitle>This Month</SectionTitle>
      <div className="pt-2 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          Best Selling Products
        </h1>
        <Link href="/" className="bg-secondary text-white px-8 py-3 rounded-sm">
          View All
        </Link>
      </div>
      <div className="pt-8 flex flex-row gap-x-6">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default BestProduct;
