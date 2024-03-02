"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from '@mui/icons-material/';
import type { SvgIconComponent } from '@mui/icons-material'
import { Alert, Button } from "@mui/material";
import cn from "classnames";
import { shortenText } from "@/utils/text";
import { useBreakpoints } from "@/hooks";
import { BlogPageObject } from "@/types";
import { destructureBlogProps } from "@/utils";

export default function HomeHero({ items }: { items: BlogPageObject[] | undefined }) {
  const { isMobile } = useBreakpoints()

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  // const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
  //   (progressCircle?.current as any)?.style?.setProperty('--progress', 1 - progress);
  //   (progressContent?.current as any).textContent = ` · `; //${Math.ceil(time / 1000)}s
  // };

  if (!items || !items.length) return <Alert>Unable to retrieve data from server</Alert>

  return (
    <section className={cn(
      "relative cursor-default mx-auto",
      "w-full h-full max-w-[1200px] md:flex md:gap-8",
    )}>
      <div className="w-full h-full">
        <Swiper
          className="home-hero-swiper"
          speed={500}
          slidesPerView={isMobile ? 1 : 2}
          spaceBetween={isMobile ? 16 : 32}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{
            delay: 20000,
          }}
          // onAutoplayTimeLeft={onAutoplayTimeLeft}
          style={{
            width: "100%",
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto",
          }}

        >
          {items.map((item, ind) => {
            const { cover, title, description } = destructureBlogProps(item)
            return <SwiperSlide
              key={ind}
              style={{
                textAlign: "center",
                fontSize: "18px",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                flexDirection: "column"
              }}
            >
              <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
                <Image
                  src={cover ?? ""}
                  alt={title ?? ""}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="z-50 w-full top-[60%] absolute bg-black bg-opacity-40 text-white space-x-2">
                <h2 className="my-2 text-4xl font-[500]">{title ?? "No title"}</h2>
                <p>{shortenText(description, 100, 15)}</p>
                <Link href={"/"}>
                  <button className=" p-1 my-2 border-b-2 border-gray-400 text-lg italic">Read</button>
                </Link>
              </div>
            </SwiperSlide>
          }
          )}
          {/* <div className="autoplay-progress" slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div> */}
        </Swiper>
      </div>

    </section>
  );
}
