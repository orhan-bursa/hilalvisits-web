import { BlogPageObject } from "@/types";
import { CountryBlogs, CountryHero } from "./sections";

export default function Country({ items }: { items: BlogPageObject[] }) {

    return (
        <div>
            <CountryHero />
            <CountryBlogs />
        </div>
    )
}