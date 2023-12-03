import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import style from "./slider.module.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-md overflow-hidden"
        id="Hero"
      >
        <SwiperSlide className="object-cover overflow-hidden">
          <img
            src={`/images/headerImage.png`}
            width={500}
            height={100}
            className="w-full rounded-sm"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide className="object-cover">
          <img
            src={`/images/headerImage.png`}
            width={500}
            height={100}
            className="w-full rounded-sm"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide className="object-cover">
          <img
            src={`/images/headerImage.png`}
            width={500}
            height={100}
            className="w-full rounded-sm"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
