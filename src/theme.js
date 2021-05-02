import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Montserrat, Roboto, Arial, sans-serif',
  },
  palette: {
    primary: {
      main: '#0e92c6',
    },
    secondary: {
      // main: 'rgb(255, 200, 67)',
      main: '#fb6842',
      lighter: '#ffffff',
    },
    grey: {
      // main:'#607d8b',
      main:'#41565e',
      // lighter: '#eceff1',
      lighter: '#f5f6f5',
      mediumlighter: '#E0E7EB',
      mediumdarker:'#455a64',
      darker: '#263238',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f6f5',
      // default: '#ffffff',
    },
    white: {
      main: '#ffffff',
    }
  },
});

export default theme;