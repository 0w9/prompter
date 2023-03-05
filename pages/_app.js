import '../styles/globals.css'
import ReactGA from 'react-ga';

export default function App({ Component, pageProps }) {
  ReactGA.initialize('G-KGYZFNWVTN');

  return <Component {...pageProps} />
}
