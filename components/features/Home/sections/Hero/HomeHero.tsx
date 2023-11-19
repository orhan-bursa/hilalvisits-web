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
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function HomeHero({ data }: { data: any[] }) {

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    //@ts-ignore
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    //@ts-ignore
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <section className="h-[500px]">
      <div className="h-[90%]">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
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
                alignItems: "center",
              }}
            >
              <Image src={url} alt={item.title ?? ""} fill objectFit="cover" />
            </SwiperSlide>
          }
          )}
          <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </Swiper>
      </div>
    </section>
  );
}
