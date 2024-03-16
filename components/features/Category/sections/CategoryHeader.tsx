import { Breadcrumbs, Chip } from "@mui/material";
import Link from "next/link";
import { MenuPageObject } from "@/types";
import { destructureMenuProps } from "@/utils";
import cn from "classnames";
interface IPropTypes {
    slug?: string
    menu?: MenuPageObject
}

export default function CategoryHeader({ slug, menu }: IPropTypes) {

    if (!menu) return <div>Başlık bilgisi bulunamadı.</div>
    const { categories, children } = destructureMenuProps(menu)
    const currentCategory = categories.find(c => c.href.includes(slug!))
    return (
        <section className="max-w-[1200px] mx-auto space-y-3">
            <h2 className={cn(
                "cursor-default px-4",
                "text-4xl font-semibold text-center",
            )}>
                {currentCategory?.title?.toUpperCase()} BLOGLARI
            </h2>
            <div className="flex justify-center">
                <Breadcrumbs >
                    <Link
                        color="inherit"
                        href="/"
                        className="hover:underline hover:text-red-500"
                    >
                        ANA SAYFA
                    </Link>
                    {categories.map((c, i) => {
                        const isLastItem = i === categories.length - 1
                        return (!isLastItem ?
                            <Link
                                key={i + c?.title}
                                color="inherit"
                                href={`/${c.href}`}
                                className="hover:underline hover:text-red-500"
                            >
                                {c?.title?.toUpperCase()}
                            </Link> :
                            <p className="font-bold cursor-default">
                                {c?.title?.toLocaleUpperCase("tr-TR")}
                            </p>
                        )
                    })}
                </Breadcrumbs>
            </div>
            {!!children.length ?
                <div className="flex justify-center flex-wrap gap-2 mb-3">
                    {children.map((c, i) => (
                        <Link
                            key={i + c.title}
                            href={`/${c.href}`}
                        >
                            <Chip
                                label={c.title}
                                className={cn(
                                    "cursor-pointer rounded bg-gray-500 text-white",
                                    "hover:bg-gray-600"
                                )}
                            />
                        </Link>
                    ))}
                </div>
                : null}
        </section>
    )
}