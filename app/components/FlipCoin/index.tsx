import React, { useState, useEffect } from "react";
import { Image, Box, keyframes } from "@chakra-ui/react";

const rotateHead = keyframes`
  0%, 100% { transform: rotate3d(0, 1, 0, 0deg); }
  50% { transform: rotate3d(0, 1, 0, 180deg) }
`;

const rotateTail = keyframes`
  0%, 100% { transform: rotate3d(0, 1, 0, 180deg); }
  50% { transform: rotate3d(0, 1, 0, 0deg); }
`;

const FlipCoin = ({ animate }: any) => {
  const headAnimation = animate
    ? `${rotateHead} 1s linear infinite alternate`
    : "";
  const tailAnimation = animate
    ? `${rotateTail} 1s linear infinite alternate`
    : "";
  return (
    <Box
      css={{
        perspective: "1000",
        margin: "1em auto",
      }}
    >
      <Box
        css={{
          position: "relative",
          width: "450px",
          height: "450px",
          textAlign: "center",
          lineHeight: "50px",
        }}
      >
        <Box
          animation={headAnimation}
          boxShadow="lg"
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backfaceVisibility: "hidden",
            zIndex: 2,
          }}
        >
          <Image boxSize="450px" alt="Supacoin Logo" src="/supacoin-logo.png" />
        </Box>
        <Box
          animation={tailAnimation}
          css={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backfaceVisibility: "hidden",
            zIndex: 1,
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
