import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import { Sidenav } from "../components/Sidenav";
import { GlobalStyles } from "../styles/global";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Sidenav />
      <Component {...pageProps} />
      <GlobalStyles />
    </>
  );
}

export default MyApp;
