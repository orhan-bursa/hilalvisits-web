import { MenuPageObject } from "@/types";
import { destructureMenuProps } from "@/utils";
import { Breadcrumbs, Chip } from "@mui/material";
import cn from "classnames";
import Link from "next/link";

export default function BlogHeader({ menus }: { menus?: MenuPageObject[] }) {

  if (!menus) return <div>Unable to get data from the server</div>;
  return (
    <section className="max-w-[1200px] mx-auto space-y-3">
      <h2 className={cn(
        "cursor-default px-4",
        "text-4xl font-semibold text-center",
      )}>
        TÜM BLOGLAR
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
          <p className="font-bold cursor-default">
            {"BLOG"}
          </p>
        </Breadcrumbs>
      </div>
      <div className="flex justify-center gap-2 mb-2">
        {menus
          ?.map(m => {
            const { title, path } = destructureMenuProps(m)
            return (
              <Link
                key={m.id}
                href={`/${path}`}
              >
                <Chip
                  label={title}
                  className={cn(
                    "cursor-pointer rounded bg-gray-500 text-white",
                    "hover:bg-gray-600"
                  )}
                />
              </Link>
            )
          })}
      </div>
    </section>
  );
}
