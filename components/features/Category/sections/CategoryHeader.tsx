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

    if (!menu) return <div>header info not found</div>
    const { categories, children } = destructureMenuProps(menu)
    const currentCategory = categories.find(c => c.href.includes(slug!))
    return (
        <section className="max-w-[1200px] w-full mx-auto">
            <div className="flex justify-center">
                <h2 className={cn(
                    "cursor-default mb-2 px-4 pb-1",
                    "text-4xl font-semibold text-center",
                    "border-b-2 border-slate-200"
                )}>
                    {currentCategory?.title?.toUpperCase()}
                </h2>
            </div>
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
                <div className="flex flex-wrap gap-2 mb-3">
                    {children.map((c, i) => (
                        <Link
                            key={i + c.title}
                            href={`/${c.href}`}
                        >
                            <Chip
                                label={c.title}
                                className={cn(
                                    "cursor-pointer rounded bg-slate-600 text-white",
                                    "hover:bg-slate-400"
                                )}
                            />
                        </Link>
                    ))}
                </div>
                : null}
        </section>
    )
}