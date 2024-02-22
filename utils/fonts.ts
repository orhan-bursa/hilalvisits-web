import { Babylonica, Montserrat, Poppins, Whisper } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const montserrat = Montserrat({ subsets: ["latin"] });

export const babylonica = Babylonica({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const whisper = Whisper({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
})