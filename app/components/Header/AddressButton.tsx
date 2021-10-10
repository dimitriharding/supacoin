import { Button } from "@chakra-ui/react";
import MetaMaskIcon from "../MetaMaskIcon";
import { truncateAddress } from "../../utils";

type ABProps = {
  address: string;
};

const AddressButton = ({ address }: ABProps) => {
  return (
    <Button
      variant={"outline"}
      colorScheme={"grey"}
      size={"sm"}
      leftIcon={<MetaMaskIcon />}
      borderRadius="full"
    >
      {truncateAddress(address, 10, "...")}
    </Button>
  );
};

export default AddressButton;
