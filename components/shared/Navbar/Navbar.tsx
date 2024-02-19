import { useState, type MouseEvent } from "react";
import cn from "classnames";

import { PAGE_LINKS, PAGE_TITLES } from "@/constants/pages";
import { CollectionsBookmark, Home, MailOutline, NotListedLocation, PhotoCamera, PhotoLibrary, Menu, Close } from "@mui/icons-material";
import Link from "next/link";
import { Button, IconButton } from "@mui/material";
import { SOCIAL_MENU_ITEMS } from "@/constants";
import { whisper } from "@/utils/fonts";
import { DesktopMenu, MobileMenu } from "./sections";
import { retrieveDatabase } from "@/utils/notion";


export default async function Navbar() {

  const database = await retrieveDatabase(process.env.NOTION_BLOGS_DATABASE_ID!)

  return (
    <>
      {false ?
        <MobileMenu database={database} />
        : null}
      <DesktopMenu database={database} />
    </>
  );
}

