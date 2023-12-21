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

export default function HomePhoto({ data }: { data: any[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { isMobile, isDesktop, isWideScreen } = useBreakpoints();

  return (
    <section className="max-w-[1200px] w-full mx-auto">
      <div className="flex w-full flex-col lg:flex-row">
        <div className="w-full lg:w-[35%] m-2 space-y-4">
          <div>
            <h1
              className={cn(
                whisper.className,
                "w-full text-amber-400 tracking-wider mb-2 cursor-default",
                "text-[60px] sm:text-[60px] text-center sm:text-start"
              )}
            >
              Photography
            </h1>
          </div>
          <p>
            I have a passion for photography! I like capturing unique moments
            during my trips. I share tips for taking best travels photographs,
            follow for more! Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Obcaecati, praesentium.
          </p>
          <div className="m-4 text-center md:text-start">
            <CustomButton LinkComponent={Link} href="/photo">
              View more
            </CustomButton>
          </div>
        </div>
        <div className="w-full lg:w-[65%]">
          <Swiper
            style={{
              height: "500px",
              width: "100%",
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
            {data.map((item, ind) => {
              const url =
                item?.cover?.files?.[0]?.external?.url ??
                item?.cover?.files?.[0]?.file?.url;
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
                    src={url}
                    alt={item.title ?? ""}
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
            slidesPerView={isMobile ? 3 : isDesktop ? 4 : 5}
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
              padding: "10px 0",
            }}
          >
            {data.map((item, ind) => {
              const url =
                item?.cover?.files?.[0]?.external?.url ??
                item?.cover?.files?.[0]?.file?.url;
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
                    src={url}
                    alt={item.title ?? ""}
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
