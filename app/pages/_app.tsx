import { ChakraProvider } from "@chakra-ui/react";
import theme from "../chakra-ui/theme";
import { AppLayout } from "../layout/AppLayout";
import { Web3Provider } from "../utils/web3Context";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <Web3Provider>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </Web3Provider>
    </ChakraProvider>
  );
}

export default MyApp;
