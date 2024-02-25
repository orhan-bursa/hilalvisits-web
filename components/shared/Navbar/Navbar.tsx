import { NavbarMenu } from "./sections";
import { getMenus } from "@/utils/notion";


export default async function Navbar() {

  const first = await getMenus({ depth: 1 })
  const second = await getMenus({ depth: 2 })
  const third = await getMenus({ depth: 3 })

  return (
    <>
      <NavbarMenu menus={{ first, second, third }} />
    </>
  );
}

