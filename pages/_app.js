import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <html data-theme="cupcake">
    <Component {...pageProps} />
  </html>
}
