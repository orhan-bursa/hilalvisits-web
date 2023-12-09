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
    <section className="w-[100%] h-[700px] relative">
      <div className="w-[40%] h-[40%] px-10 pt-4 bg-white z-50 space-y-3 absolute top-0">
        <div >
          <p className="cursor-default">My name is Hilal, I am a traveller, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat accusantium ducimus dignissimos maiores neque sint obcaecati quo dolores quaerat ad.</p>
          <button className="my-2 border-2 border-transparent border-b-gray-200 p-2 rounded hover:pl-2 hover:border-2 hover:border-gray-300 transition-all duration-700">&gt; Read more here</button>
        </div>
      </div>
      <div className="h-[100%] w-[100%]">
        <Swiper
          className="home-hero-swiper"
          speed={1000}
          slidesPerView={"auto"}
          spaceBetween={16}
          initialSlide={1}
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
          style={{
            width: "100%",
            height: "100%",
            position: "relative",

          }}

        >
          {data.map((item, ind) => {
            console.log({ item });

            const url = item?.cover?.files?.[0]?.external?.url ?? item?.cover?.files?.[0]?.file?.url
            return <SwiperSlide
              key={ind}
              style={{
                textAlign: "center",
                fontSize: "18px",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                width: "60%",
                // borderRight: "3px solid #fbbf24",
                left: "40%",
                position: "relative",
              }}
            >
              <div className="z-50 w-[70%] bottom-[10vh] right-0 absolute bg-white bg-opacity-90 text-right">
                <h2 className="text-5xl">{item?.title?.title?.[0].plain_text ?? "No title"}</h2>
                <p className="">{item?.description?.rich_text?.[0]?.plain_text}</p>
              </div>
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
