import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    common: { black: '#000', white: '#fff' },
    background: {
      paper: 'rgba(234, 234, 234, 1)',
      default: 'rgba(242, 242, 242, 1)',
    },
    primary: {
      light: 'rgba(255, 161, 4, 1)',
      main: 'rgba(222, 108, 0, 1)',
      dark: 'rgba(172, 54, 0, 1)',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgba(225, 225, 225, 1)',
      main: 'rgba(128, 125, 123, 1)',
      dark: 'rgba(87, 87, 87, 1)',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },

  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
  },
});

export default theme;
