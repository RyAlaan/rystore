import {
  faBagShopping,
  faCoins,
  faSackDollar,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const AboutPage = () => {
  const tiles = [
    {
      icon: faStore,
      upText: "10.5k",
      botText: "Sallers active in our site",
    },
    {
      icon: faCoins,
      upText: "33K",
      botText: "Monthly product sale",
    },
    {
      icon: faBagShopping,
      upText: "45.5K",
      botText: "Customer active our site",
    },
    {
      icon: faSackDollar,
      upText: "25K",
      botText: "Anual gross our site",
    },
  ];

  return (
    // <div className="flex flex-col font-poppins px-3">
    <div className="px-8">
      <div className="header flex flex-row justify-between">
        <div className="w-full lg:w-1/3 lg:self-center">
          <h2 className="text-center lg:text-left text-4xl font-semibold">
            Our Story
          </h2>
          <p className="py-3">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p>
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="hidden lg:flex lg:w-1/3">
          <Image src={`/images/about image.png`} alt="" />
        </div>
      </div>
      <div className="tile py-10 xl:px-20 flex flex-row justify-between gap-x-14">
        {tiles.map((tile, index) => (
          <div
            key={index}
            className="w-3/12 aspect-[3/2] gap-y-5 flex flex-col justify-center align-center border rounded group hover:bg-secondary hover:text-white"
          >
            <div className="h-20 w-20 rounded-full bg-[#C1C1C1] self-center flex justify-center group-hover:bg-[#E67C7C]">
              <div className="w-14 aspect-square rounded-full bg-black self-center flex justify-center flex-col group-hover:bg-white">
                <FontAwesomeIcon
                  icon={tile.icon}
                  className="text-white text-2xl group-hover:text-black"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h4 className="text-xl text-center font-extrabold">
                {tile.upText}
              </h4>
              <p className="font-medium self-center">{tile.botText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default AboutPage;
