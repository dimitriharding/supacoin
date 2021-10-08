import { ethers } from "ethers";
import SupacoinNFT from "./SupacoinNFT.json";
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

declare global {
  interface Window {
    ethereum: any;
  }
}

const getConnectedContract = () => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const connectedContract = new ethers.Contract(
    CONTRACT_ADDRESS as string,
    SupacoinNFT.abi as any,
    signer
  );

  return connectedContract;
};

export const mintNFT = () => {
  const supacoinContract = getConnectedContract();
  return supacoinContract.mind();
};

export const getCurrentNetWork = () => {
  const { ethereum } = window;
  const networkVersion = ethereum.networkVersion;
  return networkVersion;
};

export const checkIfWalletIsConnectedAndGetAccount = async () => {
  const { ethereum } = window;
  if (!ethereum) {
    console.log("Make sure you have metamask!");
    return {
      data: null,
      error: {
        message: "Make sure you have metamask!",
      },
    };
  } else {
    /*
     * Check if we're authorized to access the user's wallet
     */
    const accounts = await ethereum.request({ method: "eth_accounts" });
    /*
     * User can have multiple authorized accounts, we grab the first one if its there!
     */
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
      setupEventListener();
      const currentNetwork = getCurrentNetWork();
      return {
        error: null,
        data: {
          account,
          currentNetwork,
        },
      };
    } else {
      console.log("No authorized account found");
      return {
        data: null,
        error: null,
      };
    }
  }
};

/*
 * Implement your connectWallet method here
 */
export const connectWallet = async () => {
  const { ethereum } = window;
  try {
    if (!ethereum) {
      return {
        error: {
          message: "You need a crypto wallet to interact with this website.",
        },
        data: null,
      };
    }

    /*
     * Fancy method to request access to account.
     */
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    /*
     * Boom! This should print out public address once we authorize Metamask.
     */
    const account = accounts[0];

    const currentNetwork = getCurrentNetWork();

    // Setup listener! This is for the case where a user comes to our site
    // and connected their wallet for the first time.
    setupEventListener();
    return {
      error: null,
      data: {
        account,
        currentNetwork,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      data: null,
    };
  }
};

// Setup our listener.
const setupEventListener = async () => {
  const { ethereum } = window;
  try {
    if (ethereum) {
      const connectedContract = getConnectedContract();
      // This will essentially "capture" our event when our contract throws it.
      // If you're familiar with webhooks, it's very similar to that!
      connectedContract.on("NewSupacoinNFTMinted", (from, tokenId) => {
        console.log(from, tokenId.toNumber());
        console.log(
          `https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
        );
      });

      console.log("Setup event listener!");
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
};
