import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import { SidebarContextProvider } from "@/lib/contexts/sidebarContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Translation Service",
  description: "Free translation service for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen">
          <SidebarContextProvider>
            <Sidebar />
            <div className="flex flex-col flex-1 pl-64">
              <Header />
              <div className="p-4">{children}</div>
            </div>
          </SidebarContextProvider>
        </div>
      </body>
    </html>
  );
}
