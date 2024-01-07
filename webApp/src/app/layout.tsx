import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import NavBar from "@ClientComponents/NavBar";
import { NavBarItem } from "@types";
import NextAuthSessionProvider from "@ClientComponents/NextAuthSessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JOSHUAAAS APPP",
  description: "We gon use this to track expenses",
};

const navBarItems: NavBarItem[] = [
  {
    page: "budgets",
    href: "/budgets",
  },
  {
    page: "Submit Transaction",
    href: "/transactions",
  },
];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <NavBar items={navBarItems} />
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
