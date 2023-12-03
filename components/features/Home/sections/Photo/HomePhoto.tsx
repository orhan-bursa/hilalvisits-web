"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { CustomButton as Button } from "@/components/shared/custom";

export default function HomePhoto({ data }: { data: any[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <section>
      <div className="mb-6 space-y-4">
        <h1 className="text-amber-400 text-4xl tracking-wider">Photography</h1>
        <p className="text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, quo! Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, quo! Lorem ipsum dolor sit amet.</p>
        <Button title="View More" />
        <button className=""></button>
      </div>
      <div>
        <Swiper
          style={{
            height: "500px",
            width: "100%",
            marginLeft: "auto",
            marginRight: "auto",
            //@ts-ignore
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {data.map((item, ind) => {
            const url = item?.cover?.files?.[0]?.external?.url ?? item?.cover?.files?.[0]?.file?.url
            return <SwiperSlide
              key={ind}
              style={{
                textAlign: "center",
                fontSize: 18,
                background: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                src={url}
                alt={item.title ?? ""}
                objectFit="cover"
                fill
              />
            </SwiperSlide>
          }
          )}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper as any}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
          style={{
            width: "100%",
            height: "200px",
            marginLeft: "auto",
            marginRight: "auto",
            boxSizing: "border-box",
            padding: "10px 0"
          }}
        >
          {data.map((item, ind) => {
            const url = item?.cover?.files?.[0]?.external?.url ?? item?.cover?.files?.[0]?.file?.url
            return <SwiperSlide
              key={ind}
              style={{
                textAlign: "center",
                fontSize: 18,
                background: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Image
                src={url}
                alt={item.title ?? ""}
                objectFit="cover"
                fill
              />
            </SwiperSlide>
          }
          )}
        </Swiper>
      </div>


    </section>
  );
}
