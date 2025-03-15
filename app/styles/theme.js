import { theme as chakraTheme } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

// Fluid Typography.
// font-size  = calc(ZZ + ((1vw - XX) * YY))
// Where   XX = min_viewport / 100
//         YY = 100 * (max_font_size - min_font_size) / (max_viewport - min_viewport)
//            = 100 * font_size_difference / viewport_difference
//         ZZ = Minimum font-size stated in REM

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const fluidType = (minFont, maxFont) => {
  let XX = 768 / 100
  let YY = (100 * (maxFont - minFont)) / (1920 - 768)
  let ZZ = minFont / 16
  return `calc(${ZZ}rem + ((1vw - ${XX}px) * ${YY}))`
}

const colors = {
  background: '#000000',
  secondary: '#080808',
  complement: '#FA934F',
  displayColor: '#FFFFFF',
  textPrimary: '#D1D5DB',
  textSecondary: '#8F9094',
  button1: '#3CCF91',
  button2: '#F6A20E',
  button3: '#5132BF',
  borderColor: '#111111',
  logoGrey: '#8F9094',
}

const fonts = {
  ...chakraTheme.fonts,
  heading: `'Big Caslon FB', sans-serif`,
  body: `'Big Caslon FB', sans-serif`,
};


const breakpoints = createBreakpoints({
  base: '0em',
  sm: '30em',
  md: '48em',
  lg: '80em',
  xl: '80em',
})

const Link = {
  baseStyle: {
    color: '#3CCF91',
    _hover: { textDecoration: 'none' },
    _focus: { boxShadow: 'none' },
  },
}

const overrides = {
    ...chakraTheme,
    styles: {
      global: {
        "html, body": {
          backgroundColor: colors.background, // This should be set to black
          color: colors.textPrimary, // Set the text color to your desired primary text color
          margin: 0,
          padding: 0,
          fontFamily: fonts.body, // Optional, set your body font here
        },
      },
    },
    components: {
      Link,
    },
    config,
    colors,
    fonts,
    breakpoints,
    fontWeights: {
      normal: 300,
      medium: 600,
      bold: 700,
    },
    fontSizes: {
      display: fluidType(80, 144),
      display2: fluidType(24, 36),
      display3: fluidType(16, 24),
    },
  };
  

const customTheme = extendTheme(overrides)

export default customTheme