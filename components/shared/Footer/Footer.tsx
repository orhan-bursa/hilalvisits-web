import { PAGE_ITEMS, PAGE_LINKS, SOCIAL_LINKS } from "@/constants";
import { shortenText } from "@/utils/text";
import { ReactNode } from "react";
import { CustomButton } from "../custom";
import Link from "next/link";
import { Button } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import cn from 'classnames'

const _text = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione labore minus non vel quod doloremque laboriosam at ut reprehenderit aspernatur! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, nihil!"

export default function Footer() {
  return <footer className="h-full md:h-[240px] bg-amber-400 text-white py-2 md:py-8 cursor-default flex justify-center">
    <div className={cn(
      "h-full max-w-[400px] divide-y-2 md:divide-y-0",
      "md:flex md:flex-row md:justify-center md:divide-x-2 md:max-w-[900px]"
    )}>
      <div className="max-w-[240px] md:w-[25%] h-full px-4 border-white text-center">
        <h4 className="w-full font-bold text-lg pb-1 md:mb-2">Explore</h4>
        <div className="md:space-y-1">
          {PAGE_ITEMS.map((item, i) => <Button
            key={i + item.title}
            LinkComponent={Link}
            href={item.href}
            color="inherit"
            sx={{
              color: "#fff"
            }}
          >
            {item.title}
          </Button>
          )}
        </div>
      </div>
      <div className="w-full md:w-[50%] h-full px-8 border-white text-center">
        <h4 className="w-full font-bold text-lg pb-1 md:mb-2">About me</h4>
        <div className="md:text-start">
          <Link href={PAGE_LINKS.about}>
            <p>{shortenText(_text, 100, 15)}</p>
            <CustomButton
              color="#fff"
              colorOnHover="#fbbf24"
              style={{ border: "none" }}
              variant="text"
            >
              Read Bio
            </CustomButton>
          </Link>
        </div>
      </div>
      <div className="w-full md:w-[25%] h-full px-4 border-white text-center">
        <h4 className="w-full font-bold text-lg pb-1 md:mb-2">Socials</h4>
        <div className="flex flex-col">
          <div>
            <Button
              LinkComponent={Link}
              href={SOCIAL_LINKS.instagram}
              color="inherit"
              sx={{
                color: "#fff"
              }}
              startIcon={<Instagram />}
            >
              Instagram
            </Button>
          </div>
          <div>
            <Button
              LinkComponent={Link}
              href={SOCIAL_LINKS.facebook}
              color="inherit"
              sx={{
                color: "#fff"
              }}
              startIcon={<Facebook />}
            >
              Facebook
            </Button>
          </div>
          <div>
            <Button
              LinkComponent={Link}
              href={SOCIAL_LINKS.twitter}
              color="inherit"
              sx={{
                color: "#fff"
              }}
              startIcon={<Twitter />}
            >
              Twitter
            </Button>
          </div>
        </div>
      </div>
    </div>
  </footer>;
}

/*
<footer className="h-[320px] bg-amber-400 text-white py-8 cursor-default flex justify-center items-start">
    <div className="w-full h-full max-w-[720px] flex justify-evenly items-start">
      <div className="h-[100%] w-[30%] border-r-2 border-white">
        <h4 className="w-full font-bold text-lg pb-1 mb-2">Explore</h4>
        <div className="space-y-1">
          {PAGE_ITEMS.map((item, i) => <div key={i + item.title}>
            {item.title}
          </div>
          )}
        </div>
      </div>
      <div className="h-[100%] w-[30%] border-r-2 border-white">
        <h4 className="w-full font-bold text-lg pb-1 mb-2">About me</h4>
        <div>
          <Link href={PAGE_LINKS.about}>
            <p>{shortenText(_text, 100, 15)}</p>
            <CustomButton
              color="#fff"
              colorOnHover="#fbbf24"
              style={{ border: "none" }}
              variant="text"
            >
              Read Bio
            </CustomButton>
          </Link>
        </div>
      </div>
      <div className="h-[100%] w-[30%] border-r-2 border-white">
        <h4 className="w-full font-bold text-lg pb-1 mb-2">Socials</h4>
        <Button
          LinkComponent={Link}
          href={SOCIAL_LINKS.instagram}
          color="inherit"
          sx={{
            color: "#fff"
          }}
          startIcon={<Instagram />}
        >
          Instagram
        </Button>
        <Button
          LinkComponent={Link}
          href={SOCIAL_LINKS.facebook}
          color="inherit"
          sx={{
            color: "#fff"
          }}
          startIcon={<Facebook />}
        >
          Facebook
        </Button>
        <Button
          LinkComponent={Link}
          href={SOCIAL_LINKS.twitter}
          color="inherit"
          sx={{
            color: "#fff"
          }}
          startIcon={<Twitter />}
        >
          Twitter
        </Button>
      </div>
    </div>
  </footer>;

*/