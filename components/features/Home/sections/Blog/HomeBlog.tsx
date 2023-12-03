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
import Link from "next/link";
import { CustomButton as Button } from "@/components/shared/custom";

export default function HomeBlog({ data }: { data: any[] }) {
  return (
    <section className="h-[300px] flex gap-8 flex-wrap md:flex-nowrap">
      <div>
        <h1 className="text-amber-400 text-4xl tracking-wider my-4">Destinations</h1>
        <p className="text-base pb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, quo! Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, quo! Lorem ipsum dolor sit amet.</p>
        <Button title="EXPLORE" />
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
                aspectRatio: 9 / 16,
              }}
            >
              <div className="w-[100%] h-[100%] relative cursor-pointer overflow-hidden  group">
                <Link href={"/"}>
                  <Image fill src={url} alt={item.title ?? ""} objectFit="cover" className="hover:scale-110 transition-all duration-700" />
                </Link>
                <div className="absolute -bottom-7 group-hover:bottom-0 opacity-60 group-hover:opacity-100 from-gray-800 bg-gradient-to-t duration-500">
                  <Link
                    href={"/"}
                  >
                    <div className="flex flex-col items-start justify-end text-white text-left p-2 pb-3 z-50 w-[100%] h-[50%]">
                      <h6 className="text-lg font-semibold duration-500">Title Lorem Ipsum dolor sits</h6>
                      <p className="text-sm duration-500">{"Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, excepturi!".slice(0, 50) + " . . ."}</p>
                      <button className="self-end text-xs mt-3 duration-500">Read more</button>
                    </div>
                  </Link>
                </div>
              </div>

            </SwiperSlide>
          }
          )}
        </Swiper>
      </div>
    </section>
  );
}