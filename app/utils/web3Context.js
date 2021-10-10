import React, { useState, useEffect, useContext, createContext } from "react";
import { ethers } from "ethers";
import SupacoinNFT from "./SupacoinNFT.json";
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

const getConnectedContract = () => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const connectedContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    SupacoinNFT.abi,
    signer
  );

  return connectedContract;
};

const web3Context = createContext();
const OPEN_SEA_URL =
  process.env.NEXT_PUBLIC_APP_MODE === "test"
    ? "https://testnets.opensea.io"
    : "https://opensea.io";

const networksMap = {
  1: {
    name: "Ethereum Mainnet",
    type: "Production",
    chainId: 1,
  },
  3: {
    name: "Ropsten",
    type: "Test",
    chainId: 3,
  },
  4: {
    name: "Rinkeby",
    type: "Test",
    chainId: 4,
  },
  137: {
    name: "Polygon (Matic)",
    type: "Production",
    chainId: 137,
  },
  80001: {
    name: "Mumbai Testnet",
    type: "Test",
    chainId: 80001,
  },
};

// Context Provider component that wraps your app and makes auth object
// available to any child component that calls the useAuth() hook.
export function Web3Provider({ children }) {
  const web3 = useWeb3Provider();
  return <web3Context.Provider value={web3}>{children}</web3Context.Provider>;
}

// Hook that enables any component to subscribe to auth state
export const useWeb3 = () => {
  return useContext(web3Context);
};

// Provider hook that creates auth object and handles state
function useWeb3Provider() {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [mintedTokenLink, setMintedTokenLink] = useState(null);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) {
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
        setAccount(account);
        return {
          error: null,
          data: {
            account,
          },
        };
      } else {
        console.log("No authorized account found");
        setAccount(null);
        return {
          data: null,
          error: null,
        };
      }
    }
  };

  const switchAccount = async () => {
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    await checkIfWalletIsConnected();
  };

  /*
   * Implement your connectWallet method here
   */
  const connectWallet = async () => {
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

      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      setupEventListener();
      setAccount(account);
      return {
        error: null,
        data: {
          account,
        },
      };
    } catch (error) {
      setAccount(null);
      console.log(error);
      return {
        error,
        data: null,
      };
    }
  };

  const setupEventListener = async () => {
    const { ethereum } = window;
    try {
      if (ethereum) {
        const connectedContract = getConnectedContract();
        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        connectedContract.on("NewSupacoinNFTMinted", async (from, tokenId) => {
          const [account] = await ethereum.request({ method: "eth_accounts" });
          console.log({ account });
          console.log({ from });
          setMintedTokenLink(
            `${OPEN_SEA_URL}/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
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

  const mintNFT = () => {
    const supacoinContract = getConnectedContract();
    return supacoinContract.mint();
  };

  useEffect(() => {
    if (window.ethereum) {
      const ethereum = window.ethereum;
      // The "any" network will allow spontaneous network changes
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      provider.on("network", (newNetwork) => {
        let detectedNetwork = networksMap[newNetwork.chainId];
        detectedNetwork = detectedNetwork ? detectedNetwork : newNetwork;
        if (newNetwork?.chainId !== network?.chainId) {
          setNetwork(detectedNetwork);
        }
      });

      ethereum.on("accountsChanged", (accounts) => {
        const [account] = accounts;
        setAccount(account);
      });
    }
  }, []);

  return {
    account,
    network,
    setAccount,
    switchAccount,
    mintedTokenLink,
    connectWallet,
    checkIfWalletIsConnected,
    mintNFT,
  };
}
