import { PAGE_ITEMS, PAGE_LINKS, SOCIAL_LINKS } from "@/constants";
import { shortenText } from "@/utils/text";
import { ReactNode } from "react";
import { CustomButton } from "../custom";
import Link from "next/link";
import { Button } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
const _text = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione labore minus non vel quod doloremque laboriosam at ut reprehenderit aspernatur! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, nihil!"
export default function Footer() {
  return <footer className="bg-amber-400 text-white min-h-[200px] py-8 cursor-default flex justify-center items-start">
    <div className="w-full max-w-[720px] flex gap-8 justify-evenly items-start last:border-none">
      <FooterSection title="Explore">
        <div className="space-y-1">
          {PAGE_ITEMS.map((item, i) => <div key={i + item.title}>
            {item.title}
          </div>
          )}
        </div>
      </FooterSection>
      <FooterSection title="About me">
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
      </FooterSection>
      <FooterSection title="Socials">
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
      </FooterSection>
    </div>
  </footer>;
}

function FooterSection({ children, title }: { children: ReactNode, title: string }) {
  return <div className="flex flex-col items-start w-[30%] border-r-2 border-white">
    <h4 className="w-full font-bold text-lg pb-1 mb-2">
      {title}</h4>
    {children}
  </div>
}
