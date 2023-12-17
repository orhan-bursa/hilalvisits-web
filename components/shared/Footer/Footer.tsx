"use client"
import Link from "next/link";
import cn from 'classnames'

import { AlternateEmail, Facebook, Instagram, KeyboardArrowUp, Mail, Twitter } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { PAGE_ITEMS, SOCIAL_MENU_ITEMS } from "@/constants";
import { babylonica, montserrat } from "@/utils/fonts";

export default function Footer() {
  return (
    <footer className="h-full bg-amber-400 text-white pt-8 pb-2 cursor-default flex flex-col justify-center items-center gap-4 md:gap-6">
      <div className="max-w[900px] md:mx-8 space-y-4 md:space-y-0 md:flex md:justify-center md:gap-12">
        <div>
          <h1
            className={
              babylonica.className + " " +
              "h-full md:h-auto flex justify-center items-center text-7xl font-bold text-white z-50 whitespace-nowrap"
            }
          > Hilal Visits
          </h1>
          <div className="flex justify-center">
            {SOCIAL_MENU_ITEMS.map(item => {
              const Icon = item.icon
              return <IconButton
                LinkComponent={Link}
                href={item.href ?? "/"}
                color="inherit"
              >
                <Icon />
              </IconButton>
            })}
          </div>
        </div>
        <div className={cn(
          "flex justify-center gap-4 md:gap-12 max-w-[400px]",
          "md:border-l-2 md:border-white md:border-opacity-70 md:pl-12"
        )}>
          <div className="text-end md:text-start md:grow">
            <h4 className={cn(
              "w-full font-extralight md:space-y-1",
              "border-b-[1px] border-white border-opacity-70"
            )}>Explore</h4>
            <div className="max-w-[200px] md:max-w-none mx-auto md:mx-0 my-2 md:space-y-1">
              {PAGE_ITEMS.map((item, i) => <Button
                key={i + item.title}
                LinkComponent={Link}
                href={item.href}
                color="inherit"
                sx={{
                  color: "#fff",
                  padding: 0,
                }}
                className={montserrat.className + " " + "flex justify-end md:justify-start pr-[2px] md:pl-[2px] hover:underline hover:bg-transparent"}
              >
                {item.title}
              </Button>
              )}
            </div>
          </div>
          <div className={cn(
            "text-start md:grow-[3] border-l-2 border-white border-opacity-70 pl-4",
            "md:border-none md:border-opacity-100 md:pl-0"
          )}>
            <h4 className={cn(
              "w-full font-extralight md:space-y-1 ",
              "border-b-[1px] border-white border-opacity-70"
            )}>Contact</h4>
            <div className="max-w-[300px] md:max-w-none my-2 space-y-3">
              <p className="text-start">For business inquiries, or any questions you may have, feel free to contact me!</p>
              <Button
                variant="outlined"
                color="inherit"
                href="mailto:hilalvisits@gmail.com"
                target="blank"
                startIcon={<Mail />}
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
        <div className="flex md:justify-end md:block">
          <Tooltip title="Scroll to top" >
            <IconButton
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })}
              color="inherit"
              sx={{ border: "1px solid white", padding: "4px" }}
            >
              <KeyboardArrowUp />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="flex justify-end text-xs gap-8">
        <div>
          <p>&copy; 2023 HilalVisits, All rights reserved.</p>
        </div>
        <div className="flex gap-1">
          <Link href={"/"}>
            <p className="hover:underline">Terms</p>
          </Link>
          <p>•</p>
          <Link href={"/"}>
            <p className="hover:underline">Privacy Policy</p>
          </Link>
        </div>
      </div>
    </footer>
  )
}
