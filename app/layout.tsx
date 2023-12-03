import type { Metadata } from "next";
import { Footer, HorizontalNavbar, VerticalNavbar } from "@/components";
import "./globals.css";
import { montserrat } from "@/utils/fonts";
import Instagram from "@/components/shared/Instagram";

export const metadata: Metadata = {
  title: "Hilal Visits",
  description: "Your go to blog for traveling adventures!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <div className="main mx-auto sm:mt-10 mt:0 max-w-[1200px]">
          <div className="grid grid-cols-12">
            <div className="sm:hidden col-span-12">
              <HorizontalNavbar />
            </div>
            <div className="col-span-2 hidden sm:block justify-self-end sticky">
              <VerticalNavbar />
            </div>
            <div className="main-content-wrapper col-span-12 sm:col-span-10">{children}</div>
            <div className="col-span-12">
              <Instagram />
            </div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
