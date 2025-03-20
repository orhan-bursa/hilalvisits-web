import { Babylonica, Jost, Poppins, Whisper } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

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