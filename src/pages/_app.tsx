import { AppProps } from 'next/app';
import '~/src/styles/global.scss';
import 'styles/font.scss';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
