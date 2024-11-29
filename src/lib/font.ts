import { JetBrains_Mono, Poppins } from "next/font/google";
import { cn } from "./utils";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "600", "800"],
  preload: false
});

const fontMain = JetBrains_Mono({
  weight: "variable",
  variable: "--font-mono",
  fallback: ["system-ui", "monospace"],
  subsets: ["latin"],
  display: "swap",
});

export const fonts = cn(fontMain.variable, poppins.variable);
