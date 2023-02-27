import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles';
import AuthState from './../context/auth/AuthState';
import AppState from './../context/app/appState';
import theme from './../mui-theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthState>
        <AppState>
        <Component {...pageProps} />
        </AppState>
      </AuthState>
    </ThemeProvider>
  )
}
export default MyApp
