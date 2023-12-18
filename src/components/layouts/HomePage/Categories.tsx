import CameraSVG from "@/assets/svg/categories/Camera";
import CellPhoneSVG from "@/assets/svg/categories/CellPhone";
import ComputerSVG from "@/assets/svg/categories/Computer";
import GamepadSVG from "@/assets/svg/categories/Gamepad";
import HeadphoneSVG from "@/assets/svg/categories/Headphone";
import SmartwatchSVG from "@/assets/svg/categories/SmartWatch";
import SectionTitle from "@/components/elements/SectionTitle";
import Tile from "@/components/elements/Tile";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

const categories: { title: string; href: string; icon: React.FC }[] = [
  {
    title: "Camera",
    href: "/products?category=camera",
    icon: CameraSVG,
  },
  {
    title: "Cellphone",
    href: "/products?category=cellphone",
    icon: CellPhoneSVG,
  },
  {
    title: "Computer",
    href: "/products?category=computer",
    icon: ComputerSVG,
  },
  {
    title: "Gamepad",
    href: "/products?category=gamepad",
    icon: GamepadSVG,
  },
  {
    title: "Headphone",
    href: "/products?category=headphone",
    icon: HeadphoneSVG,
  },
  {
    title: "Smartwatch",
    href: "/products?category=smartwatch",
    icon: SmartwatchSVG,
  },
];

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Categories: React.FC = () => {
  const [swiper, setSwiper] = useState(null);

  const options = {
    navigation: {
      nextEl: "#swiper-button-next",
      prevEl: "#swiper-button-prev",
    },
  };

  const onSwiperInit = (swiper: any) => {
    setSwiper(swiper);
  };

  return (
    <>
      <div className="header w-full">
        <SectionTitle>Categories</SectionTitle>
        <div className="pt-2 flex items-center justify-between">
          <div className="">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              Browse By Categories{" "}
            </h1>
          </div>
          <div className="slider-controler flex felx-row gap-x-7">
            <div
              id="swiper-button-prev"
              className="slider-arrow bg-slate-200 rounded-full w-8 aspect-square flex justify-center items-center hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-black " />
            </div>
            <div
              id="swiper-button-next"
              className="slider-arrow bg-slate-200 rounded-full w-8 aspect-square flex justify-center items-center hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faArrowRight} className="text-black " />
            </div>
          </div>
        </div>
      </div>

      <div className="flex jusitfy-between py-10 w-full">
        <Swiper
          {...options}
          loop={true}
          slidesPerView={"auto"}
          spaceBetween={-1050}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
          // ref={onSwiperInit}
          className="w-full py-10"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index} className="w-48">
              <Tile title={category.title} href={category.href}>
                {<category.icon />}
              </Tile>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Categories;
