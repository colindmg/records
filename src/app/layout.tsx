import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Records • Visualize & share your monthly top tracks",
  description:
    "Records is a tool that lets you visualize and share your monthly top tracks on Spotify.",
  icons: "/img/logoicon.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
