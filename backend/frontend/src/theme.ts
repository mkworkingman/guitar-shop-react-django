import './font.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

export default createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 737,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    primary: {
      main: '#437fc7',
      light: '#edf6ff'
    },
    secondary: {
      main: '#000000',
      light: fade('#000000', 0.2)
    }
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h5: {
      fontWeight: 600
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.1,
      fontWeight: 500
    }
  }
});