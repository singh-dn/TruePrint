import type { Metadata } from "next";
import "./globals.css";
import { SITE_URL } from "./seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "TruePrint",
  title: "TruePrint | Premium Custom Printing & Corporate Gifting",
  description:
    "TruePrint creates premium custom printing, branded merchandise, corporate gifts and thoughtful finishing for teams, events and growing brands.",
  creator: "TruePrint",
  publisher: "TruePrint",
  category: "Printing and corporate gifting",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "TruePrint | Premium Custom Printing & Corporate Gifting",
    description: "Premium custom print, branded merchandise and corporate gifting, shaped around your brand.",
    type: "website",
    url: SITE_URL,
    siteName: "TruePrint",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "TruePrint premium printing and finishing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TruePrint | Premium Custom Printing & Corporate Gifting",
    description: "Premium custom print, branded merchandise and corporate gifting, shaped around your brand.",
    images: [`${SITE_URL}/og.png`],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "TruePrint",
                  url: SITE_URL,
                  logo: `${SITE_URL}/favicon.svg`,
                  description: "Premium custom printing, branded merchandise and corporate gifting for teams, events and brands.",
                },
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: "TruePrint",
                  publisher: { "@id": `${SITE_URL}/#organization` },
                  inLanguage: "en-IN",
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
