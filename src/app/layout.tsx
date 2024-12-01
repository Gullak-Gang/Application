import { fonts } from "@/lib/font";
import { ThemeProvider } from "@/providers/theme";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

const description = "AI-Powered Customer Feedback Analysis Pipeline | Kestra | #HackFrost 2024";
const images = '/images/cover.png';
const title = "Gullak AI - AI-Powered Customer Feedback Analysis Pipeline";
const appUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "");

export const metadata: Metadata = {
  title,
  description,
  metadataBase: appUrl,
  keywords: [
  ],
  openGraph: {
    type: 'website',
    countryName: 'India',
    title,
    description,
    images
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@Drish-xD',
    site: appUrl.toString(),
    title,
    description,
    images
  },
  category: 'Productivity',
  creator: 'Gullak Gang',
  authors: { name: 'Drish', url: appUrl },
  robots: { index: true, follow: true },
  referrer: 'origin-when-cross-origin',
  generator: 'Next.js'
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fonts}>
        <ClerkProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
        <Toaster />
      </body>
    </html>
  );
}
