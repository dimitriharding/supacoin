import React from "react";
import {
  Box,
  Flex,
  Container,
  Stack,
  useDisclosure,
  IconButton,
  useColorModeValue,
  Icon,
  useColorMode,
  Heading,
  Tag,
  TagLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { IoMoon, IoSunny } from "react-icons/io5";
import Link from "next/link";

import { Logo } from "../../components/Logo";
import { MobileNav } from "../../components/Header/MobileNav";
import { DesktopNav } from "../../components/Header/DesktopNav";
import { useWeb3 } from "../../utils/web3Context";
import { getAccountIcon } from "../../utils";

import Banner from "../Banner";

export const Header = () => {
  const { isOpen: isMobileNavOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { network, account, switchAccount } = useWeb3();
  const [showBanner, setShowBanner] = React.useState(false);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_APP_MODE === "test") {
      if (account && network?.chainId !== 80001) {
        setMessage(
          `Please connect to the Matic Mumbai testnet. You are currently on ${network?.name}.`
        );
        setShowBanner(true);
      } else {
        setShowBanner(false);
        setMessage("");
      }
    } else {
      if (account && network?.chainId !== 137) {
        setMessage(
          `Please connect to the Polygon network. You are currently on ${network?.name}.`
        );
        setShowBanner(true);
      } else {
        setShowBanner(false);
        setMessage("");
      }
    }
  }, [network]);

  return (
    <>
      <Box id="nav-bar">
        <Flex
          as={"header"}
          pos="fixed"
          top="0"
          w={"full"}
          minH={"60px"}
          boxShadow={"sm"}
          zIndex="999"
          pb={showBanner ? 2 : 0}
          pt={showBanner ? 0 : 3.5}
          justify={"center"}
          css={{
            backdropFilter: "saturate(180%) blur(5px)",
            backgroundColor: useColorModeValue(
              "rgba(255, 255, 255, 0.8)",
              "rgba(26, 32, 44, 0.8)"
            ),
          }}
        >
          <Stack w="full" align={"center"}>
            {showBanner && <Banner color="orange" message={message} />}
            <Container as={Flex} maxW={"7xl"} align={"center"}>
              <Flex
                flex={{ base: "0", md: "auto" }}
                ml={{ base: -2 }}
                mr={{ base: 6, md: 0 }}
                display={{ base: "flex", md: "none" }}
              >
                <IconButton
                  onClick={onToggle}
                  icon={
                    isMobileNavOpen ? (
                      <CloseIcon w={3} h={3} />
                    ) : (
                      <HamburgerIcon w={5} h={5} />
                    )
                  }
                  variant={"ghost"}
                  size={"sm"}
                  aria-label={"Toggle Navigation"}
                />
              </Flex>

              <Flex
                flex={{ base: 1, md: "auto" }}
                justify={{ base: "start", md: "start" }}
              >
                <Link href={"/"} passHref>
                  <Stack
                    as={"a"}
                    direction={"row"}
                    alignItems={"center"}
                    spacing={{ base: 2, sm: 4 }}
                  >
                    <Icon as={Logo} w={{ base: 8 }} h={{ base: 8 }} />
                    <Heading
                      as={"h1"}
                      fontSize={"xl"}
                      display={{ base: "none", md: "block" }}
                      color={useColorModeValue("green.400", "green.300")}
                    >
                      supacoin
                    </Heading>
                    {process.env.NEXT_PUBLIC_APP_MODE === "test" ? (
                      <Tag size="sm" colorScheme="yellow" borderRadius="full">
                        <TagLabel> Test Mode</TagLabel>
                      </Tag>
                    ) : (
                      <Tag size="sm" colorScheme="teal" borderRadius="full">
                        <TagLabel> Live </TagLabel>
                      </Tag>
                    )}
                  </Stack>
                </Link>
              </Flex>

              <Stack
                direction={"row"}
                align={"center"}
                spacing={{ base: 6, md: 8 }}
                flex={{ base: 1, md: "auto" }}
                justify={"flex-end"}
              >
                <DesktopNav display={{ base: "none", md: "flex" }} />
                <IconButton
                  size={"sm"}
                  variant={"ghost"}
                  aria-label={"Toggle Color Mode"}
                  onClick={toggleColorMode}
                  icon={
                    colorMode == "light" ? (
                      <IoMoon size={18} />
                    ) : (
                      <IoSunny size={18} />
                    )
                  }
                />
                {account && (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar size={"sm"} src={getAccountIcon(account)} />
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={async () => {
                          await switchAccount();
                        }}
                      >
                        Switch Account
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </Stack>
            </Container>
          </Stack>
        </Flex>
        <MobileNav isOpen={isMobileNavOpen} />
      </Box>
    </>
  );
};
