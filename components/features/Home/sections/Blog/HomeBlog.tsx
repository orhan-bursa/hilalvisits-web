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
import { Navigation } from "swiper/modules";
import Image from "next/image";

export default function HomeBlog({ data }: { data: any[] }) {
  return (
    <section className="h-[300px] flex gap-8 flex-wrap md:flex-nowrap">
      <div>
        <h1 className="text-amber-400 text-[32px] tracking-wider my-4">Destinations</h1>
        <p className="text-[12px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, quo! Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, quo! Lorem ipsum dolor sit amet.</p>
        <button className=""></button>
      </div>
      <div className="h-[100%] max-w-2xl border-2 border-amber-200 p-2">
        <Swiper
          slidesPerView={3}
          spaceBetween={8}
          loop={true}

          navigation={true}
          modules={[Navigation]}
          className="SwiperComponent"
          style={{
            width: "100%",
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto",
          }}

        >
          {data.map((item, ind) => {
            const url = item?.cover?.files?.[0]?.external?.url ?? item?.cover?.files?.[0]?.file?.url
            return <SwiperSlide
              key={ind}
              style={{
                textAlign: "center",
                fontSize: "18px",
                background: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                aspectRatio: 9 / 16
              }}
            >
              <div className="w-[100%] h-[100]">
                <Image fill src={url} alt={item.title ?? ""} objectFit="cover" />
              </div>
              <div className="text-white z-50 w-[100%]">Hello</div>

            </SwiperSlide>
          }
          )}
        </Swiper>
      </div>
    </section>
  );
}
