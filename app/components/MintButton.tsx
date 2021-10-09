import { Button } from "@chakra-ui/react";
import { GiCoinflip } from "react-icons/gi";

const MintButton = ({ onClick, ...rest }: any) => (
  <Button
    {...rest}
    loadingText="Mining ..."
    size="lg"
    rightIcon={<GiCoinflip />}
    color="white"
    fontWeight="bold"
    borderRadius="md"
    onClick={() => onClick()}
    spinnerPlacement="start"
    bgGradient="linear(to-r, teal.500, green.500)"
    _hover={{
      bgGradient: "linear(to-r, red.500, yellow.500)",
    }}
  >
    Mint Supacoin
  </Button>
);

export default MintButton;
