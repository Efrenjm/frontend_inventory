import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from "@mui/material/styles";
import theme from '../theme';
import ApolloConfig from "@/app/ApolloConfig";
import AppFrame from "@/components/layout/AppFrame";

export const metadata: Metadata = {
  title: "Inventory overview",
  description: "Inventory overview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description ? metadata.description : ""} />
        <title>{typeof metadata.title === 'string' ? metadata.title : "Inventory"}</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ApolloConfig>
              <AppFrame >
                {children}
              </AppFrame>
            </ApolloConfig>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
