import 'styled-components'
import theme from './dark'

declare module 'styled-components' {
    type ThemeType = typeof theme
    export interface DefaultTheme extends ThemeType{}
}