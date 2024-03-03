"use client";
import { PhotoPageObject } from "@/types";
import { destructurePhotoProps } from "@/utils";
import { Alert } from "@mui/material";
import cn from "classnames";
import Image from "next/image";

export default function PhotoGrid({ items }: { items: PhotoPageObject[] | undefined }) {

    if (!items || !items.length) return <Alert>Unable to retrieve data from server</Alert>

    return (
        <section className="cursor-default mx-auto max-w-[1200px]">

            <div className={`columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-0`
            }
            >
                {items.map((p, i) => {
                    const { image, title, type } = destructurePhotoProps(p)
                    return (
                        <div className={"flex justify-center items-center mx-1 " + (i === 0 ? "mt-0" : "mt-2")}>
                            <img src={image} alt={title} className="object-cover w-full h-full rounded" />
                        </div>
                    )
                })}
            </div>
        </section>
    )

}


/*
   <div className="w-full h-full">
                <Swiper
                    className="photo-hero-swiper"
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 16
                        },
                        1024: {
                            spaceBetween: 32,
                            slidesPerView: 2,
                        }
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Navigation, Pagination, FreeMode]}
                    freeMode
                    style={{
                        paddingBottom: 40
                    }}
                >
                    {items.map((item, ind) => {
                        const { image, title } = destructurePhotoProps(item)
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
                                    src={image ?? ""}
                                    alt={title ?? ""}
                                    fill
                                    style={{ objectFit: "cover" }}
                                />
                            </div>
                        </SwiperSlide>
                    })}
                </Swiper>
            </div>
*/