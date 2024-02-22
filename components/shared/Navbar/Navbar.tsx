import { DesktopMenu, MobileMenu } from "./sections";
import { getMenus, retrieveDatabase } from "@/utils/notion";


export default async function Navbar() {

  const first = await getMenus("first")
  const second = await getMenus("second")
  const third = await getMenus("third")
  console.log({ first, second, third })
  return (
    <>
      {false ?
        <MobileMenu menus={{ first, second, third }} />
        : null}
      <DesktopMenu menus={{ first, second, third }} />
    </>
  );
}

