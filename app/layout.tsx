import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.code-assurance.com"),
  title: "Code Assurance - Engineering Excellence Through Quality",
  description: "Premium quality assurance and testing services for enterprise tech companies. Built by engineers, for engineers.",
  alternates: {
    canonical: "https://www.code-assurance.com/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.code-assurance.com/",
    siteName: "Code Assurance",
    title: "Code Assurance - Engineering Excellence Through Quality",
    description: "Premium quality assurance and testing services for enterprise tech companies. Built by engineers, for engineers.",
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
    description: "Premium quality assurance and testing services for enterprise tech companies. Built by engineers, for engineers.",
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
