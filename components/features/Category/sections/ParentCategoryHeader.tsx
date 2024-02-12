import { Breadcrumbs, Chip } from "@mui/material";
import { GetDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import cn from "classnames";
import Link from "next/link";
interface IPropTypes {
    params: { parent?: string, category?: string, sub?: string }
    database?: GetDatabaseResponse
}

type DatabaseProperty = {
    id: string;
    name: string;
    color: string;
    description?: string
}

export default function ParentCategoryHeader({ params, database }: IPropTypes) {
    const { parent } = params

    const categoryProps = database?.properties?.category_key

    const parentCategoryProps: any = database?.properties?.parent_category_key
    const menuItems = !!categoryProps && categoryProps?.type === "select" ?
        categoryProps.select.options : []

    const property: DatabaseProperty = parentCategoryProps?.select?.options?.find((prop: DatabaseProperty) => prop.name === parent)
    const title = property?.description
    return (
        <section className="max-w-[1200px] w-full mx-auto">
            <div className="flex justify-center">
                <h2 className={cn(
                    "cursor-default mb-2 px-4 pb-1",
                    "text-4xl font-semibold text-center",
                    "border-b-2 border-slate-200"
                )}>
                    {title?.toUpperCase()}
                </h2>
            </div>
            <div className="flex justify-center">
                <Breadcrumbs >
                    <Link
                        color="inherit"
                        href="/"
                        className="hover:underline hover:text-red-500"
                    >
                        HOME
                    </Link>
                    <p className="font-bold cursor-default">{parent?.toUpperCase()}</p> :
                </Breadcrumbs>
            </div>
            {!!menuItems.length ?
                <div className="flex flex-wrap gap-2 mb-3">
                    {menuItems.map((item: DatabaseProperty) => {
                        return (
                            <Link
                                key={item.id}
                                href={`/${parent}/${item.name}`}
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