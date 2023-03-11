import '../styles/globals.css'
import { useEffect } from 'react'
import posthog from 'posthog-js'

export default function App({ Component, pageProps }) {

  useEffect(() => {
    posthog.init(
      'phc_JhRm7nwhi8VXUfPOS4m7tzQiDYogfzYWVONYtaoTD4A',
      {
        api_host: 'https://eu.posthog.com'
      })
  }, [])

  return <Component {...pageProps} />
}
