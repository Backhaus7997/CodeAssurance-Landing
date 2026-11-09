import { Archivo, IBM_Plex_Mono } from "next/font/google";

// Archivo carries a width axis: headings use font-stretch: 125%.
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const fontVariables = `${archivo.variable} ${plexMono.variable}`;
