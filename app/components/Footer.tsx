import {
  Container,
  Icon,
  Box,
  Stack,
  Text,
  Link,
  SimpleGrid,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Logo } from "../components/Logo";
import { ReactNode } from "react";

const SOCIAL_LINKS: any = [];

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}></Stack>
          <Stack align={"flex-start"}>
            {SOCIAL_LINKS.length > 0 && (
              <>
                {" "}
                <ListHeader>Social</ListHeader>
                {SOCIAL_LINKS.map((link: any) => (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </>
            )}
          </Stack>
        </SimpleGrid>
      </Container>
      <Box pb={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <NextLink href={"/"} passHref>
            <Link>
              <Icon as={Logo} w={{ base: 12 }} h={{ base: 12 }} />
            </Link>
          </NextLink>
        </Flex>
      </Box>
    </Box>
  );
};
