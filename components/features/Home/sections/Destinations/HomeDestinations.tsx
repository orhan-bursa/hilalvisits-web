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
import cn from "classnames";
import { whisper } from "@/utils/fonts";
import { CustomButton } from "@/components/shared/custom";
import { BlogPageObject } from "@/types";
import { destructureBlogProps } from "@/utils";
import { Alert, Chip } from "@mui/material";

export default function HomeDestinations({ items }: { items: BlogPageObject[] | undefined }) {

  if (!items || !items.length) return <Alert>Unable to retrieve data from server</Alert>
  return (
    <section className="max-w-[900px] w-full mx-auto">
      <div>
        <h2 className={cn(
          "w-full cursor-default py-6",
          "text-5xl text-amber-400 text-center"
        )}>
          Latest Blogs
        </h2>
      </div>
      <div className={cn(
        "w-full",
        "flex flex-col gap-8"
      )}>
        {items.map(blog => {
          const { title, description, cover, country, city, continent } = destructureBlogProps(blog)
          return (
            <div className="flex gap-6">
              <div className="relative h-[200px] aspect-square">
                <Image
                  src={cover ?? ""}
                  alt={title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div>
                <h3 className="text-2xl font-[500]">{title}</h3>
                <p>{description}</p>
                <div className="flex gap-2 mt-2">
                  {[continent, country, city].map(item => <Chip label={item} variant="outlined" sx={{
                    borderColor: "#a8a29e",
                    borderRadius: 2
                  }} />)}
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="mb-2 mt-4 space-y-2 text-center">
        <CustomButton
          href="/blog"
          LinkComponent={Link}
        >
          See All Blogs
        </CustomButton>
      </div>
    </section>
  );
}


/*

<Swiper
          slidesPerView={isMobile ? 2 : isDesktop ? 3 : 4}
          spaceBetween={8}
          loop={true}

          navigation={true}
          modules={[Navigation]}
          className="home-blog-swiper"
          style={{
            width: "100%",
            height: "100%",
            marginLeft: "auto",
            marginRight: "auto",
          }}

        >
          {items?.map((item, ind) => {
            const { cover, title } = destructureBlogProps(item)
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
              <div className="w-full h-[100%] relative cursor-pointer overflow-hidden  group">
                <Link href={"/"}>
                  <Image
                    src={cover}
                    alt={title ?? ""}
                    fill
                    style={{ objectFit: "cover" }}
                    className="hover:scale-110 transition-all duration-700"
                  />
                </Link>
                <div className="absolute -bottom-7 group-hover:bottom-0 opacity-60 group-hover:opacity-100 from-gray-800 bg-gradient-to-t duration-500">
                  <Link href={"/"}>
                    <div className="flex flex-col items-start justify-end text-white text-left p-2 pb-3 z-50 w-full h-[50%]">
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
*/