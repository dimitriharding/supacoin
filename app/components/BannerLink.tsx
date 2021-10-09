import { chakra, HTMLChakraProps } from "@chakra-ui/react";
import * as React from "react";

export const BannerLink = (props: HTMLChakraProps<"a">) => (
  <chakra.a
    {...props}
    px="4"
    py="1"
    style={{
      cursor: "position",
    }}
    textAlign="center"
    borderWidth="1px"
    borderColor="whiteAlpha.400"
    fontWeight="small"
    rounded="base"
    _hover={{ bg: "whiteAlpha.200" }}
  />
);
