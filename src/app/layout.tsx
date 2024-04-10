import DarkProvider from "@/providers/ThemeProvider/indext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calendoar",
  description: "캘린더 앱",
  icons: {
    icon: "/logo.png",
  },
  viewport: {
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <DarkProvider>{children}</DarkProvider>
      </body>
    </html>
  );
}
