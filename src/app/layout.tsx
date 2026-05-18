import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/shared/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudyMate AI | J & J Media",
  description:
    "AI-powered learning platform for African students with chat, notes summaries, quizzes, study planning, and past paper support.",
  keywords: ["StudyMate AI", "J & J Media", "AI education", "African students", "study assistant", "Next.js"],
  authors: [{ name: "J & J Media" }],
  openGraph: {
    title: "StudyMate AI",
    description: "AI-powered learning for African students.",
    siteName: "StudyMate AI by J & J Media",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyMate AI",
    description: "Study smarter with AI-powered learning tools.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
