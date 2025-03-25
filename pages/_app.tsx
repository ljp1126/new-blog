import 'styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from 'components/Layout';
import '@ant-design/v5-patch-for-react-19';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp;