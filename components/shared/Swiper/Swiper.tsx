"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const slides = [
  "Slide 1",
  "Slide 2",
  "Slide 3",
  "Slide 4",
  "Slide 5",
  "Slide 6",
  "Slide 7",
  "Slide 8",
  "Slide 9",
];

export default function SwiperComponent() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="SwiperComponent"
        style={{
          width: "100%",
          height: "100%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {slides.map((slide, ind) => (
          <SwiperSlide
            key={ind}
            style={{
              textAlign: "center",
              fontSize: "18px",
              background: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
