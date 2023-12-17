import { Babylonica, Montserrat, Whisper } from "next/font/google";

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