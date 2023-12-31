import SectionTitle from "@/components/elements/SectionTitle";
import Image from "next/image";
import Link from "next/link";

const Featured = () => {
  return (
    <>
      <SectionTitle>Featured</SectionTitle>
      <div className="pt-2 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
          Best Selling Products
        </h1>
      </div>
      <div className="pt-10 md:pt-16 flex flex-col md:flex-row justify-center gap-[30px] w-full ">
        <div className="flex justify-center md:w-full relative">
          <img
            src={`/images/featured1.png`}
            className="w-full aspect-square"
            alt=""
          />
          <div className="absolute bottom-5 left-5 w-48 z-30">
            <h4 className="text-white bolder">PlayStation 5</h4>
            <p className="text-white text-xs w-[192px] h-[32px] pt-1">
              Black and white version of the PS5 coming out on sale
            </p>
            <Link href={"/products"} className="underline text-white text-sm font-bold">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col gap-[30px] justify-center md:justify-normal">
          <div className="w-full relative">
            <img src={`/images/featured2.png`} className="w-full" alt="" />
            <div className="absolute bottom-5 left-5 w-48 z-30">
              <h4 className="text-white bolder">Women&apos;s Collections</h4>
              <p className="text-white text-xs w-[192px] h-[32px] pt-1">
                Featured woman collections that give you another vibe.
              </p>
              <Link
                href={"/products"}
                className="underline text-white text-sm font-bold"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="flex gap-x-[30px] w-full">
            <div className="w-full relative">
              <img src={`/images/featured3.png`} className="w-full" alt="" />
              <div className="absolute bottom-5 left-5 w-48 z-30">
                <h4 className="text-white bolder">Speakers</h4>
                <p className="text-white text-xs w-[192px] h-[32px] pt-1">
                  Amazon wireless speakers
                </p>
                <Link
                  href={"/products"}
                  className="underline text-white text-sm font-bold"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="w-full relative">
              <img src={`/images/featured4.png`} className="w-full" alt="" />
              <div className="absolute bottom-5 left-5 w-48 z-30">
                <h4 className="text-white bolder">Perfume</h4>
                <p className="text-white text-xs w-[192px] h-[32px] pt-1">
                  GUCCI INTENSE OUD EDP
                </p>
                <Link
                  href={"/products"}
                  className="underline text-white text-sm font-bold"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
