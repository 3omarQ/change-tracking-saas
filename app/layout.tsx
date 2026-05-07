import { Noto_Sans, Noto_Serif, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const notoMono = Noto_Sans_Mono({
  variable: "--font-noto-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${notoSans.variable} ${notoSerif.variable} ${notoMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background relative font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
