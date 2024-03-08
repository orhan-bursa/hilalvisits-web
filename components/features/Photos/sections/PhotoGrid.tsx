"use client";
import { useMemo, useState } from "react";
import cn from "classnames";
import Image from "next/image";
import { PhotoPageObject } from "@/types";
import { destructurePhotoProps } from "@/utils";
import { Alert } from "@mui/material";
import { Close, ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

export default function PhotoGrid({ items }: { items: PhotoPageObject[] | undefined }) {

    const [openImageId, setOpenImageId] = useState<string | null>(null)
    const handleOpen = (id: string) => setOpenImageId(id)
    const handleClose = () => setOpenImageId(null)

    const selectedImage = useMemo(() => items?.find(i => i.id === openImageId), [items, openImageId])
    const selectedImageProps = useMemo(() => destructurePhotoProps(selectedImage!), [selectedImage])

    const handleNext = () => {
        if (!selectedImage || !openImageId || !items) return

        const currentIndex = items.indexOf(selectedImage)
        if (currentIndex === items.length - 1) {
            setOpenImageId(items[0].id)
            return
        }
        setOpenImageId(items[currentIndex + 1].id)
    }

    const handlePrev = () => {
        if (!selectedImage || !openImageId || !items) return

        const currentIndex = items.indexOf(selectedImage)
        if (currentIndex === 0) {
            setOpenImageId(items[items.length - 1].id)
            return
        }
        setOpenImageId(items[currentIndex - 1].id)
    }

    if (!items || !items.length) return <Alert>Unable to retrieve data from server</Alert>

    return (
        <section className="cursor-default mx-auto max-w-[1400px] px-4">
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-0">
                {items.map((p, i) => {
                    const { image, title } = destructurePhotoProps(p)
                    return (
                        <div
                            key={i + title}
                            className={cn(
                                "w-full h-full flex justify-center items-center px-1 py-1",
                                "hover:opacity-90 cursor-pointer duration-300 group overflow-hidden",
                            )}
                            onClick={() => handleOpen(p?.id)}
                        >
                            <Image
                                src={image}
                                alt={title}
                                width={300}
                                height={700}
                                className="w-full h-auto rounded object-cover opacity-0 duration-1000"
                                onLoadingComplete={i => i.classList.remove("opacity-0")}
                            />
                        </div>
                    )
                })}
            </div>
            {
                !!openImageId ? (
                    <div
                        onClick={handleClose}
                        className="fixed z-[500] w-full h-full top-0 left-0 bg-opacity-80 bg-black text-white"
                    >
                        <div className="relative w-[90%] group max-w-7xl mx-auto h-[100vh] flex flex-col justify-between border-x-[1px] border-transparent hover:border-white hover:border-opacity-20"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="w-full h-full flex justify-center">
                                <Image
                                    src={selectedImageProps.image}
                                    alt={selectedImageProps.title}
                                    fill
                                    sizes="90vw"
                                    style={{ objectFit: "contain" }}
                                    className="h-full w-auto opacity-0 duration-1000"
                                    onLoadingComplete={i => {
                                        i.classList.remove("opacity-0")
                                    }}
                                />
                            </div>
                            <div className={cn(
                                "absolute top-0 right-0 w-max flex justify-between",
                                "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto duration-300",
                            )} onClick={handleClose}>
                                <Close className="w-[30px] h-[30px] cursor-pointer opacity-60" />
                            </div>
                            <div className={cn(
                                "absolute bottom-[40%] w-full flex justify-between",
                                "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto duration-300",
                            )}>
                                <div onClick={handlePrev}>
                                    <ArrowBackIosNew className="w-[40px] h-[80px] cursor-pointer opacity-60" />
                                </div>
                                <div onClick={handleNext}>
                                    <ArrowForwardIos className="w-[40px] h-[80px] cursor-pointer opacity-60" />
                                </div>
                            </div>
                            <div className={cn(
                                "bg-gradient-to-t from-[#00000080] to-transparent",
                                "absolute bottom-0 w-full flex flex-col items-center py-4 gap-2",
                                "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto duration-300",
                            )}>
                                <div className="flex gap-4">
                                    <div onClick={handlePrev}>
                                        <ArrowBackIosNew className="w-[20px] h-[20px] cursor-pointer opacity-60" />
                                    </div>
                                    {items?.indexOf(selectedImage!) + 1} - {items?.length}
                                    <div onClick={handleNext}>
                                        <ArrowForwardIos className="w-[20px] h-[20px] cursor-pointer opacity-60" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </section>
    )
}
