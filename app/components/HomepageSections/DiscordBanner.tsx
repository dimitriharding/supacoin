import {
  Button,
  Container,
  Text,
  Box,
  Stack,
  Icon,
  Flex,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoLogoDiscord } from "react-icons/io5";

export const DiscordBanner = () => {
  const color = useColorModeValue("black", "white");
  return (
    <Box color={color}>
      <Container
        as={Stack}
        maxW={"7xl"}
        py={{ base: 6, sm: 10 }}
        spacing={8}
        direction={{ base: "column", md: "row" }}
      >
        <Stack
          spacing={4}
          flex={1}
          direction={{ base: "column", sm: "row" }}
          align={{ sm: "center" }}
        >
          <Icon as={IoLogoDiscord} w={12} h={12} />
          <Stack spacing={0}>
            <Text fontFamily={"heading"} fontSize={"xl"}>
              Join the Supabase Discord
            </Text>
          </Stack>
        </Stack>
        <Flex align={"center"}>
          <Button
            w={useBreakpointValue({ base: "full", md: "inherit" })}
            as={"a"}
            bg={"white"}
            color={"discord"}
            px={8}
            py={7}
            fontSize={"lg"}
            rounded={"full"}
            href={"https://discord.com/invite/AYybku5cUz"}
            target={"_blank"}
            _hover={{
              boxShadow: "xl",
            }}
          >
            Go to Discord
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};
