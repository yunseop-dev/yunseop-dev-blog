import React from 'react'

import '../styles/globals.css'
import '../styles/reset.css'

function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />
}

export default MyApp
