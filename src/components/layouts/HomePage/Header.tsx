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
        className="mySwiper rounded-md"
        id="Hero"
      >
        <SwiperSlide>
          <img src="https://placehold.co/1300x500" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded-md"
            src="https://placehold.co/1300x500"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="rounded-md"
            src="https://placehold.co/1300x500"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
