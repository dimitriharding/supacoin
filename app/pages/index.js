import React from "react";
import { Stack, Button } from "@chakra-ui/react";
import { SEO } from "../components/SEO";
import { Hero } from "../components/HomepageSections/Hero";
import { GettingStarted } from "../components/HomepageSections/GettingStarted";
import { CTASection } from "../components/HomepageSections/CTASection";
import { DiscordBanner } from "../components/HomepageSections/DiscordBanner";
import {
  checkIfWalletIsConnectedAndGetAccount,
  connectWallet,
  mintNFT,
} from "../utils/web3";
import { useNotification } from "../utils/feedback";
import ConnectButton from "../components/ConnectButton";
import MintButton from "../components/MintButton";
import { useWeb3 } from "../utils/web3Context";

const Home = () => {
  const { setAccount, account } = useWeb3();
  const { notify } = useNotification();
  const [loading, setLoading] = React.useState(false);
  React.useEffect(async () => {
    const { data, error } = await checkIfWalletIsConnectedAndGetAccount();
    if (data) {
      setAccount(data.account);
    }

    if (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <SEO />
      <Hero animate={loading}>
        <Stack
          direction={{ base: "column", sm: "row" }}
          mb={{ base: 2, md: 4 }}
          spacing={2}
          justifyContent={{ sm: "left", md: "center" }}
        >
          {!account ? (
            <ConnectButton
              onClick={async () => {
                const { data, error } = await connectWallet();
                if (data) {
                  setAccount(data.account);
                }

                if (error) {
                  console.log(error);
                  notify({
                    title: "Get a Metamask Wallet",
                    description: error.message,
                    status: "error",
                  });
                }
              }}
            />
          ) : (
            <MintButton
              isLoading={loading === true}
              onClick={() => {
                setLoading(true);
                mintNFT()
                  .then(async (response) => {
                    await response.wait();
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.log({ error });
                    setLoading(false);
                  });
              }}
            />
          )}
          <Button
            fontWeight="bold"
            borderRadius="md"
            size="lg"
            colorScheme="teal"
            variant="ghost"
          >
            View collection on Opensea
          </Button>
        </Stack>
      </Hero>
      <GettingStarted />
      <CTASection />
      <DiscordBanner />
    </>
  );
};

export default Home;
