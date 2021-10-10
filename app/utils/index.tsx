import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-identicon-sprites";
import svgToMiniDataURI from "mini-svg-data-uri";

type Request = {
  path: string;
  method?: string;
  data?: object;
};

export function apiRequest({ path, method = "GET", data }: Request) {
  return fetch(`/api/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((response) => response.json());
}

// Create an Error with custom message and code
export function CustomError(code: number, message: string) {
  const error = new Error(message + " code: " + code);
  return error;
}

export const getNFTs = async () => {
  try {
    const images = await apiRequest({ path: "images" });
    return images;
  } catch (error) {
    return [];
  }
};

export const getAccountIcon = (account: string) => {
  const svg = createAvatar(style, {
    seed: account,
    background: "#FFF",
  });
  return svgToMiniDataURI(svg);
};

export const truncateAddress = (
  fullStr: string,
  strLen: number,
  separator: string
) => {
  if (fullStr.length <= strLen) return fullStr;

  separator = separator || "...";

  var sepLen = separator.length,
    charsToShow = strLen - sepLen,
    frontChars = Math.ceil(charsToShow / 2),
    backChars = Math.floor(charsToShow / 2);

  return (
    fullStr.substr(0, frontChars) +
    separator +
    fullStr.substr(fullStr.length - backChars)
  );
};

export const isTestMode = process.env.NEXT_PUBLIC_APP_MODE === "test";

export const getTxUrl = (tx: string) =>
  `https://${isTestMode ? "mumbai." : ""}polygonscan.com/tx/${tx}`;
