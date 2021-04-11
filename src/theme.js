import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#00b4e6',
    },
    secondary: {
      main: 'rgb(255, 200, 67)',
      lighter: '#ffffff',
    },
    grey: {
      main:'#607d8b',
      lighter: '#eceff1',
      mediumlighter: '#E0E7EB',
      mediumdarker:'#455a64',
      darker: '#263238',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#E0E7EB',
    },
  },
});

export default theme;