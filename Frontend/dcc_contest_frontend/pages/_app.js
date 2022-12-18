import '../styles/globals.css'
import dynamic from 'next/dynamic'

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false
});
export default function App({ Component, pageProps }) {
  return (
    <>
      <AnimatedCursor
        innerSize={12}
        outerSize={10}
        color='255, 255, 255'
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={4}
      />
      <Component {...pageProps} />
    </>
  )
}
