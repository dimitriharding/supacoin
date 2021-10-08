import { Button } from "@chakra-ui/react";
import { GiCoinflip } from "react-icons/gi";

const MintButton = ({ onClick }: any) => (
  <Button
    size="lg"
    leftIcon={<GiCoinflip />}
    color="white"
    fontWeight="bold"
    borderRadius="md"
    onClick={onClick}
    bgGradient="linear(to-r, teal.500, green.500)"
    _hover={{
      bgGradient: "linear(to-r, red.500, yellow.500)",
    }}
  >
    Mint Supacoin
  </Button>
);

export default MintButton;
