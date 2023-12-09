"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { babylonica } from "@/utils/fonts";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from '@mui/icons-material/';
import type { SvgIconComponent } from '@mui/icons-material'
import { IconButton } from "@mui/material";

type Socials = {
  title: string
  href: string
  icon: SvgIconComponent
}
const SOCIALS: Socials[] = [
  {
    title: "Instagram",
    href: "/",
    icon: Instagram,
  },
  {
    title: "Twitter",
    href: "/",
    icon: Twitter,
  },
  {
    title: "Twitter",
    href: "/",
    icon: Facebook,
  },
]

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
    <section className="w-full h-[700px] relative cursor-default">
      <div className="w-[35%] h-max px-10 pt-4 bg-white z-50 space-y-3 absolute top-0">
        <div >
          <p className="cursor-default">My name is Hilal, I am a traveller, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat accusantium ducimus dignissimos maiores neque sint obcaecati quo dolores quaerat ad.</p>
          <button className="my-2 border-2 border-transparent border-b-gray-200 p-2 rounded hover:pl-2 hover:border-2 hover:border-gray-400 transition-all duration-700">&gt; Read more</button>
        </div>
        <div className="flex">
          <ul className="flex text-amber-400">
            {SOCIALS.map((item) => {
              const Icon = item.icon
              return <li>
                <IconButton
                  LinkComponent={Link}
                  href="/"
                >
                  <Icon color="inherit" />
                </IconButton>
              </li>
            })
            }

          </ul>
        </div>
      </div>
      <div className="h-[100%] w-full px-2">
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
            const url = item?.cover?.files?.[0]?.external?.url ?? item?.cover?.files?.[0]?.file?.url
            return <SwiperSlide
              key={ind}
              style={{
                textAlign: "center",
                fontSize: "18px",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                width: "65%",
                left: "35%",
                position: "relative",
              }}
            >
              <div className="z-50 p-2 w-[45%] top-[60%] right-0 absolute bg-white bg-opacity-80 text-right">
                <h2 className="text-4xl font-[500] mb-2">{item?.title?.title?.[0].plain_text ?? "No title"}</h2>
                <p>{item?.description?.rich_text?.[0]?.plain_text}</p>
                <button className="p-1 mt-1 border-b-2 border-gray-400 text-lg">Read</button>
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
