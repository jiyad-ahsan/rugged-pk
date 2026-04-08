import "./globals.css";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import AuthProvider from "@/components/SessionProvider";
import ThemeProvider from "@/components/ThemeProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e4e1dd" },
    { media: "(prefers-color-scheme: dark)", color: "#222222" },
  ],
};

export const metadata = {
  title: "Rugged — Preparedness for Pakistani Families",
  description:
    "Free guides, real community, and kits built for the threats Pakistani families actually face. Not imported survival fantasies — practical readiness from Karachi.",
  keywords: ["preparedness", "Pakistan", "emergency kit", "survival", "Karachi", "family safety"],
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <Nav />
            <main className="pt-[72px] min-h-screen">{children}</main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
