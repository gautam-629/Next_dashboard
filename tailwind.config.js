/*
 *
 *  * Copyright (c) 2023 TechAxis.
 *  * All rights reserved.
 *  * Redistribution and use in source and binary forms, with or without modification, are not permitted.
 *
 */

// eslint-disable-next-line
const colors = require('tailwindcss/colors');
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];
// eslint-disable-next-line
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '992px',

      // lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      xxl: '1440px',

      '2xl': '1536px',

      mobile: '320px',
      tablet: '768px',
      laptop: '1024px',

      // => @media (min-width: 1536px) { ... }
    },

    boxShadow: {
      xs: '3px 7px 7px 0px rgba(125, 125, 125, 0.26)',
      sm: ' 16px 30px 42px 0px rgba(125, 125, 125, 0.26);',
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      herotitle: '3.375rem',
      '6xl': '4rem',
      '7xl': '5rem',
      '8xl': '6rem',
      '9xl': '8rem',
    },

    fontFamily: {
      // quicksand: ['Quicksand', 'sans-serif'],
      // outfit: ['Outfit', 'sans-serif'],
      // poppin: ['Poppins'],
    },
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    },
    colors: {
      ...colors,

      primary: {
        // 700: '#4251D8',
        // 100: 'rgba(66,81,216,0.34)',
        // 50: 'rgba(66,81,216,0.15)',
        // 200: '#146aa7',
        // 300: '#1EA7DC',
        50: '#e9f6fc',
        100: '#bce5f5',
        200: '#a5dcf1',
        300: '#8fd3ee',
        400: '#62c1e7',
        500: '#35b0e0',
        600: '#4bb9e3',
        700: '#1ea7dc',
        800: '#3DC6CE',
        900: '#093242',
        1000: '#3CC3CF',
        // 900: '06212c',
      },
      secondary: {
        // 700: '#FF9D2B',
        light: '#ffffff',
        default: '#414141',
        dark: '#1F1F1F',

        // 100: 'rgb(250,156,60)',
        50: '#aee7e3',
        100: '#9ae2dc',
        200: '#85dcd4',
        300: '#71d6cd',
        400: '#5dd0c6',
        500: '#48cabf',
        600: '#34c4b8',
        700: '#1f766e',
        800: '#1a625c',
        900: '#103b37',
        1000: '#EFEFEF',
      },

      buttonColor: {
        500: '#147AA6',
      },
      borderColor: {
        500: '#C1C1C1',
      },
      courseCreateBg: {
        500: '#F7F7FC',
      },
      offwhite: {
        500: '#FCFCFC',
      },
      inputBackground: {
        500: '#EFF0F6',
      },
      GrayscaleB: {
        500: '#F7F7FC',
      },
      Grayscale: {
        100: '#FCFCFC',
        200: '#F7F7FC',
        300: '#EFF0F6',
        400: '#D9DBE9',
        500: '#A0A3BD',
        600: '#6E7191',
        700: '#4E4B66',
        800: '#14142B',
      },
    },

    spacing: {
      none: 0,
      xxs: '4px',
      xs: '8px',
      sm: '16px',
      normal: '20px',
      md: '24px',
      lg: '32px',
      xl: '48px',
      '2xl': '64px',
      '3xl': '72px',
      '4xl': '84px',
      '5xl': '96px',
      '6xl': '108px',
      '7xl': '124px',
      med: '3.75rem',
    },
  },
  variants: {
    extend: {
      textOpacity: ['dark'],
      height: ['responsive'],
    },
  },
  plugins: [],
};
