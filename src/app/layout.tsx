import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Records • Visualize & share your monthly top tracks",
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
