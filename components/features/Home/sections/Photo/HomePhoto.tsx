"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CustomButton } from "@/components/shared/custom";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./styles.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { whisper } from "@/utils/fonts";
import cn from "classnames";
import { useBreakpoints } from "@/hooks";
import { PhotoPageObject } from "@/types";
import { destructurePhotoProps } from "@/utils";
import { Alert } from "@mui/material";

export default function HomePhoto({ items }: { items: PhotoPageObject[] | undefined }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { isMobile, isDesktop } = useBreakpoints();

  if (!items || !items.length) return <Alert>Unable to retrieve data from server</Alert>
  return (
    <section className="max-w-[900px] w-full mx-auto">
      <h2 className={cn(
        "w-full cursor-default mb-6",
        "text-5xl font-[500] text-center"
      )}>
        Photography
      </h2>
      <div className="flex w-full flex-col md:flex-row">
        <div className="w-full md:w-[35%] space-y-4 m-2">
          <p>
            I have a passion for photography! I like capturing unique moments
            during my trips. I share tips for taking best travels photographs,
            follow for more! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Obcaecati, praesentium.
          </p>
          <div className="md:text-center">
            <CustomButton
              LinkComponent={Link}
              href="/photo"
              color="gray"
            >
              View more
            </CustomButton>
          </div>
        </div>
        <div className="w-full md:w-[65%]">
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
