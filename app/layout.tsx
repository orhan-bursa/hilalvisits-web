import type { Metadata } from "next";
import { Footer, HorizontalNavbar, VerticalNavbar } from "@/components";
import "./globals.css";
import { montserrat } from "@/utils/fonts";
import Instagram from "@/components/shared/Instagram";
import { babylonica } from "@/utils/fonts";

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
        <div className="sticky top-0 md:hidden w-[100%] z-50 bg-white">
          <HorizontalNavbar />
        </div>
        {/* <div className="relative">
            <h1
              className={
                babylonica.className +
                " " +
                "text-[80px] text-amber-400 z-50 text-center mx-20 bg-white"
              }
            >
              Hilal Visits
            </h1>
          </div> */}
        {/* <div className="sticky top-0 bg-white z-50">
            <VerticalNavbar />
          </div> */}
        <div>
          {children}
        </div>
        <div className="w-[100vw]">
          <Instagram />
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
