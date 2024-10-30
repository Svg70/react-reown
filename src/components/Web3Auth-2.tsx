//@ts-ignore
import React, { useEffect, useState } from 'react';
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, CustomChainConfig } from "@web3auth/base";
import { ethers } from "ethers";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";

const clientId = "BBNDmOr3FJOtAO6wf1XUR2Y_FbwinSpPzN_zWPR0dS5vWiz5WvhbEkR_cdfENhkd_ZL3kLpXEM4yCBnks0MMpS0"; // Ваш Web3Auth Client ID

const EthMainnetAuth = () => {
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // Конфигурация для Ethereum Mainnet
        const chainConfig: CustomChainConfig = {
          chainNamespace: CHAIN_NAMESPACES.EIP155, // Для EVM-совместимых сетей
          chainId: "0x1", // Chain ID для Ethereum Mainnet (0x1 = 1)
          rpcTarget: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID", // Замените на ваш Infura проект или другой RPC URL
          displayName: "Ethereum Mainnet",
          blockExplorerUrl: "https://etherscan.io/",
          ticker: "ETH",
          tickerName: "Ether",
        };

        // Создаем экземпляр EthereumPrivateKeyProvider с правильной конфигурацией
        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig }
        });

        // Инициализация Web3Auth с использованием privateKeyProvider для Ethereum Mainnet
        const web3auth = new Web3Auth({
          clientId,
          web3AuthNetwork: "sapphire_devnet", // Используем сеть Web3Auth
          chainConfig: chainConfig,
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

  return (
    <div>
      <h2>Интеграция Web3Auth с Ethereum Mainnet</h2>
      {/* {provider ? (
        <div>
          <p>Подключенный адрес: {address}</p>
          <button onClick={logout} disabled={loading}>
            {loading ? "Выход..." : "Выйти"}
          </button>
        </div>
      ) : ( */}
        <button onClick={login} disabled={loading}>
          {loading ? "Вход..." : "Войти через Web3Auth"}
        </button>
      {/* )} */}
    </div>
  );
};

export default EthMainnetAuth;

