import { ThemingProps, useColorModeValue } from '@chakra-ui/react'

export const THEME_INITIAL_COLOR = 'dark'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'

// H5<768px,PC>768px, All style props accept arrays as values for mobile-first responsive styles. This is the recommended method.
/**
 * @link https://chakra-ui.com/docs/styled-system/responsive-styles
 * @example  Box width=300px in H5 and width=700px in PC
 * <Box w={[300, 700]}>
 *   This is a box
 * </Box>
 */
const breakpoints = {
  sm: '768px',
  md: '960px',
  lg: '1200px',
  xl: '1200px',
  '2xl': '1200px',
}

export const THEME_CONFIG = {
  breakpoints,
  initialColorMode: THEME_INITIAL_COLOR,
  useSystemColorMode: false,
  colors: {
    dark: {
      primary: '#0DB892',
      text: 'white',
      blue: '#4383FF',
      background: '#15191D',
      // background: '#1E1E1E',
      border: '#d9d9d933',
    },
    light: {
      primary: '#0DB892',
      text: '#040A2D',
      blue: '#4383FF',
      background: '#e2e8f0',
      border: '#737E8D29',
    },
    red: '#F6465D',
    link: {
      200: '#FCD535',
    },
  },
  fonts: {
    body: 'sans-serif',
  },
  // add other theme config here
}

type RawDarkColorKeys = keyof (typeof THEME_CONFIG)['colors']['dark']
type TypeDarkThemeColorKeys = `dark.${RawDarkColorKeys}`
type StyledDarkThemeColorKeys = `dark-${RawDarkColorKeys}`

type RawLightColorKeys = keyof (typeof THEME_CONFIG)['colors']['light']
type TypeLightThemeColorKeys = `light.${RawLightColorKeys}`
type StyledLightThemeColorKeys = `light-${RawLightColorKeys}`

type CommonColorKeys = keyof (typeof THEME_CONFIG)['colors']

export function useTypeColorModeValue(light: CommonColorKeys | TypeLightThemeColorKeys, dark: CommonColorKeys | TypeDarkThemeColorKeys) {
  return useColorModeValue(light, dark)
}

export function useStyledColorModeValue(light: CommonColorKeys | StyledLightThemeColorKeys, dark: CommonColorKeys | StyledDarkThemeColorKeys) {
  const color = useColorModeValue(light, dark)
  return `var(--chakra-colors-${color})`
}
