import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Code Assurance - Engineering Excellence Through Quality",
  description: "Premium quality assurance and testing services for enterprise tech companies. Built by engineers, for engineers.",
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
