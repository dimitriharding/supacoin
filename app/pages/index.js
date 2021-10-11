import React from "react";
import {
  Stack,
  Button,
  useBreakpointValue,
  Link,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { SEO } from "../components/SEO";
import { Hero } from "../components/HomepageSections/Hero";
import { GettingStarted } from "../components/HomepageSections/GettingStarted";
import { CTASection } from "../components/HomepageSections/CTASection";
import { DiscordBanner } from "../components/HomepageSections/DiscordBanner";
import { useNotification } from "../utils/feedback";
import ConnectButton from "../components/ConnectButton";
import MintButton from "../components/MintButton";
import { useWeb3 } from "../utils/web3Context";
import { getTxUrl } from "../utils";

const Home = () => {
  const {
    account,
    checkIfWalletIsConnected,
    connectWallet,
    mintNFT,
    mintedTokenLink,
  } = useWeb3();
  const { notify } = useNotification();
  const [loading, setLoading] = React.useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  React.useEffect(async () => {
    await checkIfWalletIsConnected();
  }, []);

  return (
    <>
      <SEO
        twitterTitle="Supacoin | Hacktoberfest 2021 - Supabase Hackathon"
        twitterDescription="Supacoin is a collection of swaggable NFTs that are inspired by Supabase and tools around it!"
        twitterImage="/summary-card.png"
      />
      <Hero animate={loading} mintedTokenLink={mintedTokenLink}>
        <div>
          <Stack
            direction={{ base: "column", sm: "row" }}
            mb={{ base: 2, md: 4 }}
            spacing={2}
            justifyContent={{ sm: "left", md: "center" }}
          >
            {!account ? (
              <ConnectButton
                onClick={async () => {
                  const { error } = await connectWallet();

                  if (error) {
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
                    .then(async (transaction) => {
                      await transaction.wait();
                      notify({
                        title: "Your Supacoin was successfully minted!",
                        description: (
                          <Text>
                            "You can now view your freshly minted Supacoin on
                            Opensea. Sometimes it takes a few minutes to show
                            up.
                            <br />
                            See transaction{" "}
                            <Link
                              alignItems="center"
                              href={getTxUrl(transaction.hash)}
                              isExternal
                            >
                              {getTxUrl(transaction.hash)}
                              <ExternalLinkIcon mx="2px" />
                            </Link>
                          </Text>
                        ),
                        status: "success",
                      });
                      setLoading(false);
                    })
                    .catch((error) => {
                      notify({
                        title: "Could not mint your Supacoin!",
                        description: "Please try again later.",
                        status: "error",
                      });
                      setLoading(false);
                    });
                }}
              />
            )}
            {process.env.NEXT_PUBLIC_OPENSEA_LINK && (
              <Button
                fontWeight="bold"
                borderRadius="full"
                size="lg"
                colorScheme="teal"
                variant="ghost"
                isActive={isMobile}
              >
                <Link
                  alignItems="center"
                  href={process.env.NEXT_PUBLIC_OPENSEA_LINK}
                  isExternal
                >
                  View collection on Opensea{" "}
                  {!isMobile && <ExternalLinkIcon mx="2px" />}
                </Link>
              </Button>
            )}
          </Stack>
        </div>
      </Hero>
      <GettingStarted />
      <CTASection />
      <DiscordBanner />
    </>
  );
};

export default Home;
