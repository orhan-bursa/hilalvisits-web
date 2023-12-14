import type { Metadata } from "next";
import { Footer, Header, Navbar } from "@/components";
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
        <div>
          <Navbar />
          {children}
          <Instagram />
          <Footer />
        </div>
      </body>
    </html>
  );
}
