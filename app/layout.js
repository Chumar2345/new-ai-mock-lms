import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Virtual Mock Ai",
  description: "Ace your next interview with confidence using AI-driven simulations.",
  icons: {
    icon: "/favicon2.png", // Path to your favicon
    shortcut: "/favicon.ico", // For browsers that look for the .ico format
    apple: "/apple-touch-icon.png", // For Apple devices
    other: {
      rel: "mask-icon",
      url: "/safari-pinned-tab.svg", // For Safari pinned tabs
      color: "#5bbad5", // Adjust to match your theme
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Favicon for general browsers */}
          <link rel="icon" href="/favicon2.png" type="image/png" />

          {/* Shortcut icon for older browsers */}
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

          {/* Apple Touch Icon */}
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

          {/* Safari Pinned Tabs */}
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        </head>
        <body className={inter.className}>
          <Toaster />
          <div className="layout">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
