import { isTestMode } from "../../utils";
export interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  isExternal?: boolean;
  toolTip?: string;
}

const scanUrl = `https://${
  isTestMode ? "mumbai." : ""
}polygonscan.com/address/${
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
}/transactions`;

const gitRepoUrl = "https://github.com/dimitriharding/supacoin/blob/main";

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "How to",
    href: "",
    children: [
      {
        label: "Add Polygon to Metamask",
        href: `${gitRepoUrl}/guides/add_polygon_network_to_metamask.md`,
        subLabel: "Learn how to easily add the Polygon network to your wallet.",
      },
      {
        label: "Get Matic in Wallet",
        href: `${gitRepoUrl}/guides/get_matic`,
        subLabel:
          "Learn how to get matic in your wallet so you can start minting.",
      },
    ],
  },
  {
    label: "Gallery",
    href: "/gallery",
    toolTip: "Browse 100 images of the total Supacoins",
  },
  {
    label: "Collection",
    href: "",
    isExternal: true,
    toolTip: "View collection on Opensea",
  },
  {
    label: "Transactions",
    href: scanUrl,
    isExternal: true,
    toolTip:
      "View all transactions of the Supacoin smart contract on Polygon scan",
  },
];
