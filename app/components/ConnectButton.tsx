import { Button } from "@chakra-ui/react";
import MetaMaskIcon from "./MetaMaskIcon";

const ConnectButton = ({ onClick }: any) => (
  <Button
    size="lg"
    leftIcon={<MetaMaskIcon />}
    color="white"
    fontWeight="bold"
    borderRadius="md"
    onClick={onClick}
    _hover={{
      bgGradient: "linear(to-r, red.500, yellow.500)",
    }}
  >
    Connect to Wallet
  </Button>
);

export default ConnectButton;
