import { createMuiTheme } from '@material-ui/core/styles';

const brandColors = {
  white: '#FFFFFF',
  darkgrey: '#42575F',
  grey: '#888888',
  lightgrey: '#F5F7F7',
  mediumlightgrey: '#efefef',
  limegreen: '#81FF90',
  green: '3EC64E',
  purple: '#171446',
  red: '#EF4648',
  orange: '#FE6843',
  blue: '#0094CA',
  cyan: '#26BCF3',
}
// A custom theme for this app
const theme = createMuiTheme({
  typography: {
    fontFamily: 'DM+Sans, Montserrat, Arial, sans-serif',
    fontSize: 12,
  },
  palette: {
    primary: {
      main: brandColors.blue,
      variant: brandColors.cyan,
    },
    secondary: {
      main: brandColors.limegreen,
      variant: brandColors.green,
    },
    error: {
      main: brandColors.red,
    },
    success: {
      main: brandColors.limegreen,
    },
    warning: {
      main: brandColors.orange,
    },
    surface: {
      main: brandColors.lightgrey,
      border: brandColors.mediumlightgrey,
    },
    info: {
      main: brandColors.blue,
    },
    background: {
      main: brandColors.white,
      variant: brandColors.darkgrey
    },
    text: {
      reverted: brandColors.white,
      primary: brandColors.darkgrey,
      secondary: brandColors.grey,
      disabled: brandColors.lightgrey,
      link: brandColors.cyan,
      hoverlink: brandColors.blue,
    },
  },
});

export default theme;