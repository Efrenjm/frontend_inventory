'use client';
import { Dongle, Fira_Sans, Quicksand, Nunito, Gidugu, Open_Sans, Signika_Negative, Lexend_Deca, Viga } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

/* Debatibles */
export const dongle = Dongle({ /* Use size 28 */
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});
const fira_sans = Fira_Sans({
  weight: '500',
  subsets: ['latin'],
  display: 'swap'
})
const quicksand = Quicksand({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap'
})
const nunito = Nunito({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap'
})
export const viga = Viga({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap'
})

const theme = createTheme({
  typography: {
    fontFamily: [dongle.style.fontFamily, viga.style.fontFamily].join(','),
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
