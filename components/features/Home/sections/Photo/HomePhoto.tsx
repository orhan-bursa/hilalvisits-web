"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./styles.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { PhotoPageObject } from "@/types";
import { destructurePhotoProps } from "@/utils";
import { Alert, Button } from "@mui/material";

export default function HomePhoto({ items }: { items: PhotoPageObject[] | undefined }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  if (!items || !items.length) return <Alert>Unable to retrieve data from server</Alert>
  return (
    <section className="max-w-[900px] w-full mx-auto">
      <h2 className={cn(
        "w-full cursor-default mb-6",
        "text-4xl md:text-5xl font-semibold text-center",
      )}>
        Fotoğraflar
      </h2>
      <div className="flex w-full flex-col max-[900px]:px-4">
        <div className="w-full space-y-4 m-2">
          <p>
            Fotoğrafçılığa tutkum var! Gezilerim sırasında eşsiz anları yakalamayı seviyorum. En iyi seyahat fotoğraflarını çekmenin ipuçlarını paylaşıyorum,
            daha fazlası için galerime göz atın veya instagram sayfamı ziyaret edin.
          </p>
          <div className="mb-2 mt-4 text-center">
            <Button
              variant="outlined"
              color="inherit"
              LinkComponent={Link}
              href="/photo"
              className="hover:bg-transparent text-black"
            >
              Galeri
            </Button>
          </div>
        </div>
        <div className="w-full">
          <Swiper
            style={{

              width: "100%",
              aspectRatio: 1,
              marginLeft: "auto",
              marginRight: "auto",
              //@ts-ignore
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {items?.map((item, ind) => {
              const { image, title } = destructurePhotoProps(item)

              return (
                <SwiperSlide
                  key={ind}
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    background: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={image}
                    alt={title ?? ""}
                    style={{ objectFit: "cover" }}
                    fill
                    sizes={`
                      (max-width: 900px) calc(100vw-32px), 
                      900px
                      `}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper as any}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
            style={{
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              boxSizing: "border-box",
              padding: "10px 0",
            }}
          >
            {items?.map((item, ind) => {
              const { image, title } = destructurePhotoProps(item)

              return (
                <SwiperSlide
                  key={ind}
                  style={{
                    background: "#fff",
                    width: "25%",
                    aspectRatio: 1
                  }}
                >
                  <Image
                    src={image}
                    alt={title ?? ""}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes={`
                      (max-width: 900px) calc((100vw-32px-40px)/4), 
                      218px
                      `}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
