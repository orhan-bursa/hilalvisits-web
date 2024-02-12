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

export default function SubCategoryHeader({ params, database }: IPropTypes) {
    const { parent, category, sub } = params

    const subCategoryProps: any = database?.properties?.sub_category_key

    const property: DatabaseProperty = subCategoryProps?.select?.options?.find((prop: DatabaseProperty) => {
        console.log(prop.name, sub)

        return prop.name === sub
    })

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
                <Breadcrumbs>
                    <Link
                        color="inherit"
                        href="/"
                        className="hover:underline hover:text-red-500"
                    >
                        HOME
                    </Link>
                    <Link
                        color="inherit"
                        href={`/${parent}`}
                        className="hover:underline hover:text-red-500"
                    >
                        {parent?.toUpperCase()}
                    </Link>
                    <Link
                        color="inherit"
                        href={`/${parent}/${category}`}
                        className="hover:underline hover:text-red-500"
                    >
                        {category?.toUpperCase()}
                    </Link>
                    <p className="font-bold cursor-default">{sub?.toUpperCase()}</p>
                </Breadcrumbs>
            </div>
        </section>
    )
}