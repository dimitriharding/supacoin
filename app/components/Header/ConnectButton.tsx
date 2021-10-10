import { Button, useColorModeValue } from "@chakra-ui/react";
import MetaMaskIcon from "../MetaMaskIcon";

const ConnectButton = ({ onClick }: any) => {
  const color = useColorModeValue("gray.700", "white");
  return (
    <Button
      size={"sm"}
      leftIcon={<MetaMaskIcon />}
      bg="whiteAlpha.400"
      color={color}
      fontWeight="bold"
      borderRadius="full"
      onClick={onClick}
      _hover={{
        bgGradient: "linear(to-r, red.500, yellow.500)",
      }}
    >
      Connect to Wallet
    </Button>
  );
};

export default ConnectButton;
