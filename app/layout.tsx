import "./globals.css";
import Providers from "@/components/providers/Providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-screen bg-background relative">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
