import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Rugged — Preparedness for Pakistani Families",
  description:
    "Free guides, real community, and kits built for the threats Pakistani families actually face. Not imported survival fantasies — practical readiness from Karachi.",
  keywords: ["preparedness", "Pakistan", "emergency kit", "survival", "Karachi", "family safety"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Nav />
          <main className="pt-[72px] min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
