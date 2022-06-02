import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';

const theme = createTheme({
  typography: {
    h1: {
      fontWeight: 500,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#202657',
    },
    background: {
      default: '#2B3482',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
      <CssBaseline />
    </ThemeProvider>
  );
}

export default MyApp;
