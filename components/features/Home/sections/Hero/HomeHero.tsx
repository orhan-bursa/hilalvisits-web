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
import { babylonica } from "@/utils/fonts";

export default function HomeHero({ data }: { data: any[] }) {

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    //@ts-ignore
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    //@ts-ignore
    progressContent.current.textContent = ` · `; //${Math.ceil(time / 1000)}s
  };
  return (
    <section className="h-[80vh] w-[100%] relative">
      <div className="absolute w-[calc(35vw-16px)] h-max bg-white bg-opacity-90 z-50 right-0 top-[100px] space-y-3 border-y-[3px] border-amber-400">
        <h1
          className={
            babylonica.className +
            " " +
            "relative right-[0px] text-[100px] text-amber-400 z-50 text-center mx-20 border-b-2 cursor-pointer duration-700 whitespace-nowrap"
          }
        >
          Hilal Visits
        </h1>
        <div className="ml-[32px] text-gray-600">
          <p className="cursor-default">My name is Hilal, I am a traveller, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat accusantium ducimus dignissimos maiores neque sint obcaecati quo dolores quaerat ad.</p>
          <button className="my-2 border-2 border-transparent border-b-gray-200 p-2 rounded hover:pl-2 hover:border-2 hover:border-gray-300 transition-all duration-700">&gt; Read more here</button>
        </div>
      </div>
      <div className="h-[80vh] w-[100%]">
        <Swiper
          speed={1000}
          slidesPerView={"auto"}
          spaceBetween={16}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 40000,
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
                justifyContent: "left",
                alignItems: "center",
                width: "65vw",
                borderRight: "3px solid #fbbf24",
              }}
            >
              <Image
                src={url}
                alt={item.title ?? ""}
                fill
                objectFit="cover"
              />
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
