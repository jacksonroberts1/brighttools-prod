import type { Metadata } from "next";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";
import PageLoader from "@/components/PageLoader";
import CustomCursor from "@/components/CustomCursor";
import BackgroundEffects from "@/components/BackgroundEffects";

export const metadata: Metadata = {
  title: "BrightTools - Graphics & 3D Design",
  description: "Cutting-edge graphics and 3D web experiences",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PageLoader />
        <CursorGlow />
        <CustomCursor />
        <BackgroundEffects />
        {children}
      </body>
    </html>
  );
}
