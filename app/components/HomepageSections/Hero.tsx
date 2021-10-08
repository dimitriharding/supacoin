import {
  Container,
  Stack,
  Heading,
  Text,
  Box,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { TextUnderline } from "../../components/TextUnderline";
import FlipCoin from "../FlipCoin";
interface HeroProps {
  categoriesCount: number;
  templatesCount?: number;
}

export const Hero = ({ children }: any) => {
  const isDesktop = useBreakpointValue({ base: false, md: true });
  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      css={{
        backgroundAttachment: "fixed",
      }}
    >
      <Stack
        as={Container}
        maxW={"7xl"}
        h={{ base: "100%", lg: "100vh" }}
        minH={950}
        py={{ base: 24, lg: 32 }}
        spacing={{ base: 10, lg: 24 }}
        direction={{ base: "column", lg: "row" }}
        alignItems={"center"}
      >
        <Stack spacing={12} mb={{ base: 12, lg: 0 }} flex={2}>
          {!isDesktop && (
            <Stack maxW={"xl"} direction={{ base: "column", sm: "row" }}>
              {children}
            </Stack>
          )}
          <Heading
            as={"h2"}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
            maxW={"2xl"}
          >
            Mint your <TextUnderline>Supacoin NFT!</TextUnderline> it's Free
          </Heading>
          <Stack spacing={5}>
            {isDesktop && (
              <Stack maxW={"xl"} direction={{ base: "column", sm: "row" }}>
                {children}
              </Stack>
            )}
            <Text color={"gray.500"} fontSize={{ md: "lg" }} maxW={"2xl"}>
              The Supacoin project was created during the 2021 Hacktoberfest
              Supabase hackathon.
              <br />
              <br />
              This is a collection of 2020 uniquely generated, colorful, and
              swaggable NFTs living on the Polygon Chain.
            </Text>
          </Stack>
        </Stack>
        <FlipCoin />
      </Stack>
    </Box>
  );
};
