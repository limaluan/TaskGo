import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Header } from "../components/Header";
import { Sidenav } from "../components/Sidenav";
import { makeServer } from "../services/mirage";
import { GlobalStyles } from "../styles/global";

if (process.env.NODE_ENV === "development") {
  makeServer();
}

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Sidenav />
      <Component {...pageProps} />
      <GlobalStyles />

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
