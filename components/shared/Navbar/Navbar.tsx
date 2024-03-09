import { NavbarClient } from "./sections";
import { getMenus } from "@/utils/notion";


export default async function Navbar() {
  const menus = await getMenus()
  const first = menus?.filter(m => m?.properties?.depth?.formula?.number === 1)
  const second = menus?.filter(m => m?.properties?.depth?.formula?.number === 2)
  const third = menus?.filter(m => m?.properties?.depth?.formula?.number === 3)

  return (
    <NavbarClient menus={{ first, second, third }} />
  );
}

