import { Text, Flex } from "@chakra-ui/react";
import Subtitle from "./SubTitle";

const PageTitle = ({ title, subTitle, colorLeft, colorRight }: any) => {
  return (
    <Flex
      mb={5}
      direction="column"
      align="center"
      flex={{ base: 1, md: "auto" }}
    >
      <Text
        bgGradient={`linear(to-r, ${colorLeft ? colorLeft : " red.500"}, ${
          colorRight ? `${colorRight})` : " yellow.500)"
        }}, `}
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
      >
        {title}
      </Text>
      {subTitle && <Subtitle text={subTitle} />}
    </Flex>
  );
};

export default PageTitle;
