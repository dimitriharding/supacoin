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

const Home = () => {
  const { notify } = useNotification();
  const [loading, setLoading] = React.useState(false);
  const [connectedWalletDetails, setConnectedWalletDetails] =
    React.useState(null);
  React.useEffect(async () => {
    const { data, error } = await checkIfWalletIsConnectedAndGetAccount();
    if (data) {
      setConnectedWalletDetails(data);
    }

    if (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <SEO />
      <Hero>
        <Stack
          direction={{ base: "column", sm: "row" }}
          mb={{ base: 2, md: 4 }}
          spacing={2}
          justifyContent={{ sm: "left", md: "center" }}
        >
          {!connectedWalletDetails ? (
            <ConnectButton
              onClick={async () => {
                const { data, error } = await connectWallet();
                if (data) {
                  setConnectedWalletDetails(data);
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
              onClick={() => {
                setLoading(true);
                mintNFT()
                  .then((response) => {
                    console.log({ response });
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.log({ response });
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
