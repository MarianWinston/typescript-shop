import type { AppProps } from 'next/app'
import { BasketProvider } from '../context/BasketContext';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BasketProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </BasketProvider>
  );
}

export default MyApp;
