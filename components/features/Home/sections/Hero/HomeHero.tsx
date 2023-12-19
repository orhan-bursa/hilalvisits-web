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
import { IconButton } from "@mui/material";
import cn from "classnames";
import { SOCIAL_LINKS } from "@/constants";
import { shortenText } from "@/utils/text";
import { useBreakpoints } from "@/hooks";

type Socials = {
  title: string
  href: string
  icon: SvgIconComponent
}
const SOCIALS: Socials[] = [
  {
    title: "Instagram",
    href: SOCIAL_LINKS.instagram,
    icon: Instagram,
  },
  {
    title: "Twitter",
    href: SOCIAL_LINKS.twitter,
    icon: Twitter,
  },
  {
    title: "Facebook",
    href: SOCIAL_LINKS.facebook,
    icon: Facebook,
  },
]

export default function HomeHero({ data }: { data: any[] }) {

  const { isMobile } = useBreakpoints()

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    //@ts-ignore
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    //@ts-ignore
    progressContent.current.textContent = ` · `; //${Math.ceil(time / 1000)}s
  };
  return (
    <section className="w-full h-[900px] sm:h-[800px] md:h-[700px] relative cursor-default">
      <div className="h-[700px] min-h-[700px] md:h-full w-full bg-gray-200 p-2">
        <Swiper
          className="home-hero-swiper"
          speed={1000}
          slidesPerView={"auto"}
          spaceBetween={isMobile ? 8 : 16}
          initialSlide={1}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 8000,
          }}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
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
                alignItems: "center",
                width: isMobile ? "100%" : "65%",
                left: isMobile ? 0 : "35%",
                position: "relative",
              }}
            >
              <div className="z-50 w-full top-[60%] absolute bg-black bg-opacity-40 text-right text-white space-x-2">
                <h2 className="my-2 text-4xl font-[500]">{item?.title?.title?.[0].plain_text ?? "No title"}</h2>
                <p>{shortenText(item?.description?.rich_text?.[0]?.plain_text, 100, 15)}</p>
                <Link href={"/"}>
                  <button className=" p-1 my-2 border-b-2 border-gray-400 text-lg italic">Read</button>
                </Link>

              </div>
              <Image
                src={url}
                alt={item.title ?? ""}
                fill
                style={{ objectFit: "cover" }}
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
      <div className={cn(
        "w-full block h-max px-4 md:px-8 py-4 md:mt-2 bg-white z-50 space-y-3 top-0",
        "md:w-[35%] md:absolute",
        "opacity-90"
      )}>
        <div >
          <p className="cursor-default">My name is Hilal, I am a traveller, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat accusantium ducimus dignissimos maiores neque sint obcaecati quo dolores quaerat ad.</p>
        </div>
        <div className="flex md:flex-col items-center justify-between md:items-start">
          <button className={cn(
            "w-32 my-2 border-2 border-transparent border-b-gray-200 p-2 rounded",
            "hover:pl-2 hover:border-2 hover:border-gray-400",
            "transition-all duration-700"
          )}
          >Read more</button>
        </div>
      </div>
    </section>
  );
}
