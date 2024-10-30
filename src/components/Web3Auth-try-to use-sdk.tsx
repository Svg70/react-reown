//@ts-ignore
import React, { useContext, useEffect, useState } from 'react';
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";
import { ethers } from "ethers";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { baseUrl, SdkContext } from '../sdk/sdk/SdkContext';
import { Address } from "@unique-nft/utils";
import { connectSdk } from '../sdk/sdk/connect';
import { UniqueFungibleFactory } from '@unique-nft/solidity-interfaces';

const clientId = "BBNDmOr3FJOtAO6wf1XUR2Y_FbwinSpPzN_zWPR0dS5vWiz5WvhbEkR_cdfENhkd_ZL3kLpXEM4yCBnks0MMpS0"; // Ваш Web3Auth Client ID

const UniqueChainConfig = () => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState('');

  const [signerEth, setSignerEth] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // Конфигурация сети в формате CustomChainConfig
        const chainConfig: CustomChainConfig = {
          chainNamespace: CHAIN_NAMESPACES.EIP155, // Обязательное свойство
          chainId: "0x22B0", // Chain ID для Unique Mainnet
          rpcTarget: "https://rpc.unique.network", // RPC URL сети Unique
          displayName: "Unique Mainnet",
          blockExplorerUrl: "https://unique.subscan.io/",
          ticker: "UNQ",
          tickerName: "UNQ",
        };

        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig }
        });

        const web3auth = new Web3Auth({
          clientId,
          web3AuthNetwork: "sapphire_devnet",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: "0x22B0",
            rpcTarget: "https://rpc.unique.network",
            displayName: "Unique Mainnet",
            blockExplorerUrl: "https://unique.subscan.io/",
            ticker: "UNQ",
            tickerName: "UNQ",
          },
          privateKeyProvider,
        });

        setWeb3Auth(web3auth);
        await web3auth.initModal();

        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error("Ошибка инициализации Web3Auth:", error);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3Auth) return;
    setLoading(true);
    try {
      const web3AuthProvider = await web3Auth.connect();
      setProvider(web3AuthProvider);
      
      const ethersProvider = new ethers.BrowserProvider(web3AuthProvider);
      const signer = await ethersProvider.getSigner();
      setSignerEth(signer);
      
      const userAddress = await signer.getAddress();
      setAddress(userAddress);
    } catch (error) {
      console.error("Ошибка входа:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (!web3Auth) return;
    setLoading(true);
    try {
      await web3Auth.logout();
      setProvider(null);
      setAddress('');
    } catch (error) {
      console.error("Ошибка выхода:", error);
    } finally {
      setLoading(false);
    }
  };

   // add to the existing useState hook.
const [signedMessage, setSignedMessage] = useState("");

const signMessage = async(e) => {
  e.preventDefault();
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }

  // this guide uses ethers version 6.3.0.
  const ethersProvider = new ethers.BrowserProvider(provider);
  // for ethers version below 6.3.0.
  // const provider = new ethers.providers.Web3Provider(provider);

  const signer = await ethersProvider.getSigner();

  const originalMessage = e.target.message.value;
  const result = await signer.signMessage(originalMessage);
  setSignedMessage(result)  
}
const { sdk } = useContext(SdkContext);

const doSomething = async () => {
  if (!signerEth) return;

  // Initialize SDK and connect using signer
  const sdk = await connectSdk(baseUrl, signerEth);

  // Extract the Ethereum address
  const ethereumAddress = Address.extract.substrateOrMirrorIfEthereumNormalized(address);
  const balance = await sdk.balance.get({ address: ethereumAddress });
  console.log(balance, 'BAL');

  // Extract the cross-chain account IDs for from and to addresses
  const from = Address.extract.ethCrossAccountId(address);
  const to = Address.extract.ethCrossAccountId('5GgJQ2tETLVqq34oQ8nMUgKzdgyeYTDogYGHEhGq93ztmLg3');
  const contractAddress = '0xa32194392a947ff2bd8e776e8d6aae957ff6850d';
  
  const contractCallResult = await sdk.evm.uniqueFungible.call({
    functionName: 'transferFromCross',
    functionArgs: [
      from,
      to,
      1
    ],
    contract: {
      address: contractAddress
    },
    gasLimit: BigInt(300000),
  });

  console.log(contractCallResult, 'Transfer Result');

  // Handle the result of the transaction
  console.log(contractCallResult, 'Transfer Result');
};


  return (
    <div>
      <h2>Web3Auth - Unique</h2>
      {address ? (
        <div>
          <p>address: {address}</p>
          <button onClick={logout} disabled={loading}>
            {loading ? "Выход..." : "Выйти"}
          </button>
        </div>
      ) : (
        <button onClick={login} disabled={loading}>
          {loading ? "Вход..." : "Войти через Web3Auth"}
        </button>
      )}

      <div>
      <form onSubmit={signMessage}>
                <input type="text" name="message" placeholder="Set message" required/>
                <input type="submit" value="Sign Message"/>
        </form> 
        <div>SignedMessage: ${signedMessage}</div>
      </div>

      <div>
        use SDK
        <button onClick={doSomething}>ACTION!</button>
      </div>
    </div>
  );
};

export default UniqueChainConfig;
