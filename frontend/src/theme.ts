import './font.css';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#437fc7',
      light: '#edf6ff'
    },
    secondary: {
      main: '#000000'
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