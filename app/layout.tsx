import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.code-assurance.com"),
  title: "Code Assurance - Engineering Excellence Through Quality",
  description: "Quality assurance services and test automation for enterprise teams. Built by engineers, for engineers — reduce release risk with reliable regression and CI stability.",
  // alternates.canonical eliminado para evitar herencia global
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.code-assurance.com/",
    siteName: "Code Assurance",
    title: "Code Assurance - Engineering Excellence Through Quality",
    description: "Quality assurance services and test automation for enterprise teams. Built by engineers, for engineers — reduce release risk with reliable regression and CI stability.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Code Assurance - QA Services & Test Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Code Assurance - Engineering Excellence Through Quality",
    description: "Quality assurance services and test automation for enterprise teams. Built by engineers, for engineers — reduce release risk with reliable regression and CI stability.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
