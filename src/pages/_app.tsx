import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import { Sidenav } from "../components/Sidenav";
import { makeServer } from "../services/mirage";
import { GlobalStyles } from "../styles/global";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

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
