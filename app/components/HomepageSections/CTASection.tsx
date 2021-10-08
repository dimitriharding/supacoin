import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { IoArrowUp } from "react-icons/io5";

export const CTASection = () => {
  return (
    <Box bg={useColorModeValue("green.50", "gray.800")}>
      <Container maxW={"7xl"} py={{ base: 14, sm: 20, md: 32 }}>
        <Box
          bg={useColorModeValue("green.400", "green.500")}
          rounded={"xl"}
          color={useColorModeValue("white", "gray.100")}
          px={{ base: 4, md: 10 }}
          py={10}
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box>
              <Heading as={"h3"} mb={2}>
                Get an NFT!
              </Heading>
              <Text fontSize={"lg"}>
                Supabase is open source and it just felt right for use to
                provide these Supacoins to anyone who is interested.
              </Text>
            </Box>
            <Flex w={"full"} align={"center"} justify={"center"}>
              <NextLink href="#nav-bar">
                <Button
                  as={"a"}
                  bg={"green.600"}
                  color={"white"}
                  px={8}
                  size={"lg"}
                  fontSize={"md"}
                  rounded={"md"}
                  rightIcon={<IoArrowUp />}
                  _hover={{
                    bg: "green.700",
                  }}
                >
                  Mint Supacoin
                </Button>
              </NextLink>
            </Flex>
          </SimpleGrid>
        </Box>
      </Container>
    </Box>
  );
};
