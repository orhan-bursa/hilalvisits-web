import { Breadcrumbs, Chip } from "@mui/material";
import { GetDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import cn from "classnames";
import Link from "next/link";
interface IPropTypes {
    params: { parent?: string, category?: string, sub?: string }
    type: "parent" | "category" | "sub"
    database?: GetDatabaseResponse
}

type MenuItem = {
    id: string;
    name: string;
    color: string;
    description?: string
}

export default function CategoryHeader({ params, type, database }: IPropTypes) {
    const { parent, category, sub } = params

    const parentCategoryProps = database?.properties?.parent_category_key
    const categoryProps = database?.properties?.category_key
    const subCategoryProps = database?.properties?.sub_category_key

    const menuItems =
        type === "parent" && !!categoryProps && categoryProps?.type === "select" ?
            categoryProps.select.options : []

    const title =
        type === "sub" ? sub :
            type === "category" ? category :
                type === "parent" ? parent : null

    return (
        <section className="max-w-[1200px] w-full mx-auto">
            <h2 className={cn(
                "w-full cursor-default mb-6",
                "text-5xl font-semibold text-center"
            )}>
                {title?.toUpperCase()}
            </h2>
            <Breadcrumbs >
                <Link
                    color="inherit"
                    href="/"
                    className="hover:underline hover:text-red-500"
                >
                    HOME
                </Link>

                {type === "parent" ?
                    <p className="font-bold cursor-default">{parent?.toUpperCase()}</p> :
                    <Link
                        color="inherit"
                        href={`/${parent}`}
                        className="hover:underline hover:text-red-500"
                    >
                        {parent?.toUpperCase()}
                    </Link>}
                {type === "category" ?
                    <p className="font-bold cursor-default">{category?.toUpperCase()}</p> :
                    type === "sub" ?
                        <Link
                            color="inherit"
                            href={`/${parent}/${category}`}
                            className="hover:underline hover:text-red-500"
                        >
                            {category?.toUpperCase()}
                        </Link> : null}
                {type === "sub" ? <p className="font-bold cursor-default">{sub?.toUpperCase()}</p>
                    : null}
            </Breadcrumbs>
            {!!menuItems.length ?
                <div className="flex flex-wrap gap-2 mb-3">
                    {menuItems.map((item: MenuItem) => {
                        return (
                            <Link
                                key={item.id}
                                href={
                                    type === "parent" ? `/${parent}/${item.name}`
                                        : type === "category" ? `/${parent}/${category}/${item.name}`
                                            : "/"
                                }
                            >
                                <Chip
                                    key={item.id}
                                    label={item.description}
                                    className={cn(
                                        "cursor-pointer rounded bg-slate-600 text-white",
                                        "hover:bg-slate-400"
                                    )}
                                />
                            </Link>
                        )
                    })}
                </div>
                : null}
        </section>
    )
}