import React, { useState, useEffect, useContext, createContext } from "react";
import { ethers } from "ethers";
import { checkIfWalletIsConnectedAndGetAccount } from "../utils/web3";
const web3Context = createContext();

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

  const switchAccount = async () => {
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });
    const { data, error } = await checkIfWalletIsConnectedAndGetAccount();
    if (data) {
      setAccount(data.account);
    }

    if (error) {
      setAccount(null);
    }
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
    }
  }, []);

  return {
    account,
    network,
    setAccount,
    switchAccount,
  };
}
