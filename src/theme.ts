'use client';
import { Dongle, Hind_Vadodara } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

export const body = Dongle({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});
export const title = Hind_Vadodara({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap'
})

const theme = createTheme({
  typography: {
    fontFamily: [body.style.fontFamily, title.style.fontFamily].join(','),
    fontSize: 24
  },
  palette: {
    primary: {
      main: '#1A2440',
      // light: '#1A2440',
      // dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F2600C',
      // light: '#ff7961',
      // main: '#F2F2F2',
      // dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default theme;
