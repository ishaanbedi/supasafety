import '../styles/globals.css'
import { MapProvider } from '../context/mapContext'
function MyApp({ Component, pageProps }) {
  return <MapProvider><Component {...pageProps} /></MapProvider>
}

export default MyApp
