import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from "@mui/material/styles";
import theme from '../theme';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/utils/http";
import ApolloConfig from "@/app/ApolloConfig";
import AppFrame from "@/components/layout/AppFrame";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const drawerWidth = 240;
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description? metadata.description: ""} />
        <title>{typeof metadata.title === 'string' ? metadata.title : "Inventory"}</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ApolloConfig>
              <QueryClientProvider client={queryClient}>
                <AppFrame>
                  {children}
                </AppFrame>
              </QueryClientProvider>
            </ApolloConfig>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
