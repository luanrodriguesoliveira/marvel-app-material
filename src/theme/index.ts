import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#EE171F',
    },
    secondary: {
      main: '#FFFFFF',
    },
    error: {
      main: '#FEFE00',
    },
    background: {
      default: '#000000',
      paper: '#fff',
    },
  },
});

export default theme;
