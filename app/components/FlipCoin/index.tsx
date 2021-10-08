import React, { useState, useEffect } from "react";
import { Image, Box, keyframes } from "@chakra-ui/react";

const rotate = keyframes`
  0% {
    transform: rotate3d(0, 1, 0, 0deg);
  }
  50% {
    transform: rotate3d(0, 1, 0, 180deg);
  }
  100% {
    transform: rotate3d(0, 1, 0, 360deg);
  }
`;

const FlipCoin = ({ animate }: any) => {
  const coinAnimation = animate ? `${rotate} infinite 1s linear` : "";
  return (
    <Box
      css={{
        perspective: "1000",
        margin: "1em auto",
      }}
    >
      <Box
        animation={coinAnimation}
        css={{
          position: "relative",
          width: "450px",
          height: "450px",
          textAlign: "center",
          lineHeight: "50px",
        }}
      >
        <Box
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backfaceVisibility: "hidden",
            zIndex: 2,
            transform: "rotateY(0deg)",
          }}
        >
          <Image boxSize="450px" alt="Supacoin Logo" src="/supacoin-logo.png" />
        </Box>
        <Box
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backfaceVisibility: "hidden",
            zIndex: 1,
            transform: "rotateY(180deg)",
          }}
        >
          <Image
            boxSize="450px"
            alt="Supacoin Logo"
            src="/supacoin-logo-back.png"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FlipCoin;
