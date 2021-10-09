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
