import {
  Container,
  Heading,
  Text,
  Box,
  Stack,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

const STEPS = [
  {
    title: "Connect Polygon Network",
    text: "The Polygon chain was used to take advantage of the lower gas fees compared to the Ethereum Mainnet",
  },
  {
    title: "Mint Your Own Supacoin",
    text: "Supacoin NFTs are free for minting, you only need to cover a small gas free",
  },
  {
    title: "View Your Supacoin on Opensea",
    text: "All minted Supacoin NFT will showup on Opensea",
  },
];

export const GettingStarted = () => {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")}>
      <Container maxW={"7xl"} py={{ base: 14, sm: 20, md: 32 }}>
        <Heading as={"h3"} textAlign={"center"} mb={{ base: 14, sm: 16 }}>
          How it works
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify={"space-between"}
          align={{ base: "center", md: "flex-start" }}
        >
          {STEPS.map((step, index) => (
            <Stack
              textAlign={{ base: "left", md: "center" }}
              align={{ base: "flex-start", md: "center" }}
              spacing={4}
              key={step.title}
              maxW={{ base: "full", md: "xs" }}
              mt={{ base: 10, md: 0 }}
              _first={{
                mt: 0,
              }}
              px={4}
            >
              <Flex
                w={10}
                h={10}
                bg={useColorModeValue("green.100", "green.900")}
                color={useColorModeValue("green.700", "green.300")}
                fontWeight={700}
                align={"center"}
                justify={"center"}
                fontSize={"sm"}
                rounded={"md"}
              >
                0{index + 1}
              </Flex>
              <Text
                fontFamily={"heading"}
                fontSize={"xl"}
                color={useColorModeValue("gray.700", "white")}
              >
                {step.title}
              </Text>
              <Text color={"gray.500"}>{step.text}</Text>
            </Stack>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};
