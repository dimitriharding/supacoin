"use strict";

const path = require("path");
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
const { MODE } = require(path.join(basePath, "src/blendMode.js"));
const description =
  "The Supacoin project was created during the 2021 Hacktoberfest Supabase hackathon. \n\n This is a collection of 800 uniquely generated, colorful, and swaggable NFTs living on the Polygon Chain.  \n\n\n It was made with Supabase lovers in mind, and tools that are used with Supabase.";
const baseUri =
  "https://guywxbvrqiimbwosujbe.supabase.in/storage/v1/object/public/supacoin-prod/images";

const layerConfigurations = [
  {
    growEditionSizeTo: 100,
    layersOrder: [{ name: "Pattern" }, { name: "Supacoin" }],
  },
  {
    growEditionSizeTo: 200,
    layersOrder: [{ name: "Plain" }, { name: "Supacoin" }],
  },
  {
    growEditionSizeTo: 300,
    layersOrder: [{ name: "Gradient" }, { name: "Supacoin" }],
  },
  {
    growEditionSizeTo: 350,
    layersOrder: [{ name: "Pattern" }, { name: "Supacoin" }, { name: "Emoji" }],
  },
  {
    growEditionSizeTo: 400,
    layersOrder: [
      { name: "Plain" },
      { name: "Supacoin" },
      { name: "IF YOU KNOW" },
    ],
  },
  {
    growEditionSizeTo: 500,
    layersOrder: [{ name: "Pattern" }, { name: "Supacoin Posterize" }],
  },
  {
    growEditionSizeTo: 600,
    layersOrder: [{ name: "Plain" }, { name: "Supacoin Posterize" }],
  },
  {
    growEditionSizeTo: 700,
    layersOrder: [{ name: "Gradient" }, { name: "Supacoin Posterize" }],
  },
  {
    growEditionSizeTo: 750,
    layersOrder: [
      { name: "Pattern" },
      { name: "Supacoin Posterize" },
      { name: "Emoji" },
    ],
  },
  {
    growEditionSizeTo: 800,
    layersOrder: [
      { name: "Plain" },
      { name: "Supacoin Posterize" },
      { name: "IF YOU KNOW" },
    ],
  },
];

const shuffleLayerConfigurations = true;

const debugLogs = false;

const format = {
  width: 1500,
  height: 1500,
};

const background = {
  generate: false,
  brightness: "80%",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 10,
  thumbWidth: 500,
  imageRatio: format.width / format.height,
  imageName: "preview.png",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
};
