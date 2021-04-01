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
      mainGradient:
        'linear-gradient(to left, rgba(172, 54, 0, 1), rgba(255, 161, 4, 1))',
      contrastText: '#fff',
    },
    secondary: {
      light: 'rgba(225, 225, 225, 1)',
      main: 'rgba(128, 125, 123, 1)',
      mainGradient:
        'linear-gradient(30deg, rgba(0, 0, 0, .1) 0%, rgba(234, 234, 234, 1) 40%)',
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
    warning: {
      light: '#ffb74d',
      main: '#ff9800',
      dark: '#f57c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    info: {
      light: '#64b5f6',
      main: '#2196f3',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    success: {
      light: '#81c784',
      main: '#4caf50',
      dark: '#388e3c',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#d5d5d5',
      A200: '#aaaaaa',
      A400: '#303030',
      A700: '#616161',
    },
    typography: {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontSize: 14,
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
    },
  },
});

export default theme;
