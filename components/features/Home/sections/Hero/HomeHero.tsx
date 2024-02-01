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
import { SOCIAL_LINKS } from "@/constants";
import { shortenText } from "@/utils/text";
import { useBreakpoints } from "@/hooks";
import { montserrat } from "@/utils/fonts";
import { BlogPageObject } from "@/types";
import { destructureBlogProps } from "@/utils";

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

export default function HomeHero({ items }: { items: BlogPageObject[] | undefined }) {
  const { isMobile } = useBreakpoints()

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s: any, time: any, progress: any) => {
    (progressCircle?.current as any)?.style?.setProperty('--progress', 1 - progress);
    (progressContent?.current as any).textContent = ` · `; //${Math.ceil(time / 1000)}s
  };

  if (!items || !items.length) return <Alert>Unable to retrieve data from server</Alert>
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
                width: isMobile ? "100%" : "65%",
                left: isMobile ? 0 : "35%",
                position: "relative",
              }}
            >
              <div className="z-50 w-full top-[60%] absolute bg-black bg-opacity-40 text-right text-white space-x-2">
                <h2 className="my-2 text-4xl font-[500]">{title ?? "No title"}</h2>
                <p>{shortenText(description, 100, 15)}</p>
                <Link href={"/"}>
                  <button className=" p-1 my-2 border-b-2 border-gray-400 text-lg italic">Read</button>
                </Link>

              </div>
              <Image
                src={cover}
                alt={title ?? ""}
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
          <Button
            LinkComponent={Link}
            href="/"
            variant="text"
            color="inherit"
            sx={{
              width: 128,
              marginY: 2,
              border: "2px solid white",
              borderBottom: "2px solid #e2e8f0",
              textTransform: "none",
              fontFamily: montserrat.className,
              fontSize: 18,
              transition: "all 500ms ease",
              "&:hover": {
                border: "2px solid #94a3b8"
              }
            }}
          >
            Read more
          </Button>
        </div>
      </div>
    </section>
  );
}
