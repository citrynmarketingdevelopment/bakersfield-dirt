import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";
import "@/styles/header.css";
import "@/styles/button.css";
import "@/styles/footer.css";
import "@/styles/site.css";
import "@/styles/quote.css";
import "@/styles/services.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bakersfielddirt.com"),
  title: { default: "Bakersfield Dirt | Dirt Delivery, Haul-Away & Aggregates", template: "%s | Bakersfield Dirt" },
  description: "Fill dirt, bulk aggregates and jobsite trucking for Bakersfield and Kern County. Arrange material delivery or haul excess dirt away.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
