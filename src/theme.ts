"use client";
import { Dongle, Hind_Vadodara } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

export const body = {
  style: { fontFamily: "Spiegel" },
  fontWeight: 400,
};
/* Dongle({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
}); */

export const title = {
  style: { fontFamily: "Beaufort" },
  fontWeight: 700,
};
/* Hind_Vadodara({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
}); */

const theme = createTheme({
  typography: {
    fontFamily: "Spiegel, Arial, sans-serif",
    fontSize: 18,
  },
  palette: {
    primary: {
      main: "#005A82",
      // light: '#1A2440',
      // dark: '#002884',
      contrastText: "#fff",
    },
    secondary: {
      main: "#10c0e3",
      // light: '#ff7961',
      // main: '#F2F2F2',
      // dark: '#ba000d',
      contrastText: "#000",
    },
  },
});

export default theme;
