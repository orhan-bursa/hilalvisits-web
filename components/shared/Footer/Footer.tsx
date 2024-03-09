import { getMenus } from "@/utils/notion";
import { FooterClient, FooterLegals } from "./sections";

export default async function Footer() {
  const first = await getMenus(1)
  return (
    <footer className="h-full bg-amber-400 text-white pt-8 pb-2 cursor-default flex flex-col justify-center items-center gap-4 md:gap-6 px-2 md:px-0 ">
      <FooterClient first={first} />
      <FooterLegals />
    </footer>
  )
}



