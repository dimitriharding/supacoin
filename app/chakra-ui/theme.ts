import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  discord: "#7289da",
};

const theme = extendTheme({ config, colors });

export default theme;
