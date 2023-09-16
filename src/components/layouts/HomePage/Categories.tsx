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

import { Autoplay, Navigation } from "swiper/modules";

const categories: { title: string; href: string; icon: React.FC }[] = [
  {
    title: "Camera",
    href: "/camera",
    icon: CameraSVG,
  },
  {
    title: "Cellphone",
    href: "/cellphone",
    icon: CellPhoneSVG,
  },
  {
    title: "Computer",
    href: "/computer",
    icon: ComputerSVG,
  },
  {
    title: "Gamepad",
    href: "/gamepad",
    icon: GamepadSVG,
  },
  {
    title: "Headphone",
    href: "/headphone",
    icon: HeadphoneSVG,
  },
  {
    title: "Smartwatch",
    href: "/smartwatch",
    icon: SmartwatchSVG,
  },
];

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const Categories: React.FC = () => {
  const [swiper, setSwiper] = useState(null);

  const options = {
    // slidesPerView: "auto" as const,
    // autoplay: {
    //   delay: 3000,
    // },
    // module={[Autoplay, Navigation]},
    // pagination: {
    //   el: ".swiper-pagination",
    // },
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

      <div className="flex jusitfy-center py-10">
        <Swiper
          {...options}
          loop={true}
          slidesPerView={"auto"}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          centeredSlides={true}
          modules={[Autoplay, Navigation]}
          ref={onSwiperInit}
          className="w-full"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index} className="w-full">
              <Tile title={category.title} href="/">
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
