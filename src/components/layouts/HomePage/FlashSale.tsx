import Button from "@/components/elements/Button";
import Card from "../../fragments/Card/Card";
import Countdown from "../../fragments/Countdown";
import Link from "next/link";
import SectionTitle from "@/components/elements/SectionTitle";
import { cardType } from "@/types/cardType";

const FlashSale = () => {
  const cards: cardType[] = [
    {
      image:
        "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/w_411,c_limit/30f8062f-0f8e-4fb5-9d32-1da71f6dd8e8/nikecourt-legacy-next-nature-shoes-m5FZ0S.png",
      discount: 40,
      title: "Menggokil",
      price: 230,
      rating: 4.5,
      people: 100,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcStlajLc7ZjfulmjUkuB_aTc4i-ScwdLLkPRiAXGvLeDAsrOKQjO1PBp_zINA9fTdxLxrN8fUcR0eEFaD6WwR_MQ3Aj8s54fA&usqp=CAE",
      discount: 23,
      title: "Menggokil",
      price: 549,
      rating: 4.5,
      people: 100,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRuR3vWJJWWJgecfum35xkYeGjimbZLFiGpJi15CS5jWZFMO12OZSPvADu0upzc4Ms_nlMl2vk_BHtuulzak5R3c6bP3TwfRTDoNFqcVwoeYyWExKyBkju8AQ&usqp=CAE",
      discount: 30,
      title: "Menggokil",
      price: 420,
      rating: 4.5,
      people: 100,
    },
    {
      image:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRzWypi6JMGWDHWjB-SrtmvqvaU6zYdoN4RLV801WL-F2Nw-nxZLE8_ifsmkoDE_z_0uDEI6l54QtmZOX0mf1y1OUh3RF9ofKp0mxhNjo0&usqp=CAE",
      discount: 20,
      title: "Menggokil",
      price: 300,
      rating: 4.5,
      people: 100,
    },
    {
      image:
        "https://thumbor.sirclocdn.com/unsafe/800x/filters:quality(95):format(webp)/https://storage.googleapis.com/sirclo-prod-storefront/products/d6828b01-4b95-4ad9-91fd-97e68f773dff-matcha.jpg",
      discount: 25,
      title: "Menggokil",
      price: 468,
      rating: 4.5,
      people: 100,
    },
    {
      image:
        "https://www.noirgear.com/cdn/shop/products/luminous2-01_540x.jpg?v=1660279288",
      discount: 20,
      title: "Menggokil",
      price: 324,
      rating: 4.5,
      people: 100,
    },
  ];

  return (
    <>
      <div className="" id="FlashSale">
        <SectionTitle>Today's</SectionTitle>
        <div className="pt-2 flex items-end justify-between">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
            Flash Sales
          </h1>
          <Countdown targetDate={"9/6/23 12:00:00"} />
        </div>
      </div>
      <div className="pt-8 flex flex-row gap-x-6">
        {cards.map((card, index) => (
          <Card key={index} {...card} />
        ))}
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
