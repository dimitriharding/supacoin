import { ChakraProvider } from "@chakra-ui/react";
import theme from "../chakra-ui/theme";
import "../styles/FlipCoin.module.css";
import { AppLayout } from "../layout/AppLayout";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ChakraProvider>
  );
}

export default MyApp;
