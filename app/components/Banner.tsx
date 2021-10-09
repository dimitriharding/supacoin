import { BellIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { BannerLink } from "./BannerLink";

const Banner = ({ color = "blue", message, linkText }: any) => (
  <Box as="section" w="full">
    <Stack
      direction={{ base: "column", sm: "row" }}
      justifyContent="center"
      alignItems="center"
      px={{ base: "3", md: "6", lg: "8" }}
      color="white"
      bg={useColorModeValue(`${color}.600`, `${color}.400`)}
    >
      <HStack spacing="3">
        <Icon as={BellIcon} fontSize="2xl" h="10" />
        <Text fontWeight="small" marginEnd="2">
          {message}
        </Text>
      </HStack>
      {linkText && (
        <BannerLink w={{ base: "full", sm: "auto" }} flexShrink={0}>
          {linkText}
        </BannerLink>
      )}
    </Stack>
  </Box>
);

export default Banner;
