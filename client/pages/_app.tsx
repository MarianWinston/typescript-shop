import type { AppProps } from 'next/app'
import { BasketProvider } from '../context/BasketContext';
import Footer from '../components/Footer/Footer';
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BasketProvider>
      <Component {...pageProps} />
      <Footer />
    </BasketProvider>
  );
}

export default MyApp;
