'use client';
import { Roboto, Advent_Pro } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    typography: {
        fontFamily: 'Raleway, Arial',
    },
    palette: {
        background: {
            paper: '#fff'
        },
        text: {
            primary: '#173A5E',
            secondary: '#46505A',
        },
        action: {
            active: '#001E3C',
        },
        primary: {
            main: '#FFC107',
        },

        // success: {
        //     dark: '#009688',
        // },
    },
});

export default theme;
