import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import NavBar from "@ClientComponents/NavBar";
import { NavBarItem } from "@types";
import NextAuthSessionProvider from "@ClientComponents/NextAuthSessionProvider";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@api/authOptions";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Budget App",
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
  // const ignore = await initialSetup("jnthomas522@gmail.com");

  const session = await getServerSession(authOptions)
  const userName = session?.user?.name
  if(!userName){
    return redirect("api/auth/signin")
  }

  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <NavBar items={navBarItems} userName={userName} />
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
