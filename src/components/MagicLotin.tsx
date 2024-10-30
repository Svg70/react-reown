// src/MagicLogin.js
import React, { useState } from 'react';
import { Magic } from 'magic-sdk';
import { ethers } from "ethers";
import { Address } from '@unique-nft/utils';
import { connectSdk } from '../sdk/sdk/connect';
import { baseUrl } from '../sdk/sdk/SdkContext';
// Инициализируем Magic SDK с указанием сети Unique Network
const magic = new Magic('pk_live_E224E308B81F94FB', {
  network: {
    rpcUrl: 'https://rpc.unique.network', // Unique Network RPC URL
    //chainId: 8880, // Chain ID для Unique Network
    chainId: 0x22B0,
            // displayName: "Unique Mainnet",
  },
});

const MagicLogin = () => {
  const [email, setEmail] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMetadata, setUserMetadata] = useState(null);
  const [provider, setProvider] = useState(null); // Для хранения провайдера

  // Вход через Magic Link
  const handleLogin = async () => {
    try {
      // Magic отправляет пользователю email для аутентификации
      await magic.auth.loginWithMagicLink({ email });

      // После успешного входа, получаем данные пользователя
      const metadata = await magic.user.getMetadata();
      setUserMetadata(metadata);

      // Создаем провайдера для взаимодействия с блокчейном
      const ethersProvider = new ethers.BrowserProvider(magic.rpcProvider);
      const signer = await ethersProvider.getSigner();
    //   setSignerEth(signer);
      setProvider(ethersProvider);

      console.log('SET_OK')
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Ошибка при входе:', err);
    }
  };

  // Выход
  const handleLogout = async () => {
    await magic.user.logout();
    setIsLoggedIn(false);
    setUserMetadata(null);
    setProvider(null); // Очистить провайдера при выходе
  };

  // Пример функции для выполнения транзакций
  const doSomething = async () => {
    if (!provider) {
      console.error('Провайдер не инициализирован');
      return;
    }
    const network = await provider.getNetwork();
    console.log('Подключенная сеть:', network);

  

    const signer = await provider.getSigner(); // Получаем signer для взаимодействия с сетью

    console.log(signer, 'SIGNER')
    try {
      const address = await signer.getAddress(); // Получаем Ethereum адрес
      console.log(`Адрес: ${address}`);

      const sdk = await connectSdk(baseUrl, address);
  
      const ethereumAddress = Address.extract.substrateOrMirrorIfEthereumNormalized(address);
      const balance = await sdk.balance.get({ address: ethereumAddress });
      console.log(balance, 'BAL')

      // Подключение к смарт-контракту или выполнение транзакции
      const tx = await signer.sendTransaction({
        to: '0xe2D683AC11D5A3271469Ae363FE464a9dcAe4404', // Замените на адрес получателя
        value: ethers.parseEther('1'), // Отправка 0.1 токена
      });

      console.log('Транзакция отправлена:', tx.hash);

      // Ожидание подтверждения транзакции
      await tx.wait();
      console.log('Транзакция подтверждена');
    } catch (err) {
      console.error('Ошибка при отправке транзакции:', err);
    }
  };

  const transfer = async (to: string, amount: string) => {
    if (!provider) {
      console.error('Провайдер не инициализирован');
      return;
    }
   
    
    try {
      //if (!ethers.isAddress(from)) throw new Error(`Invalid address ${from}`)
      if (!ethers.isAddress(to)) throw new Error(`Invalid address ${to}`)
      const amountBigInt = BigInt(amount)
      const provider = new ethers.BrowserProvider(magic.rpcProvider as any)
      const signer = await provider.getSigner()

      const address = await signer.getAddress();
      const sdk = await connectSdk(baseUrl, address);
  
      const ethereumAddress = Address.extract.substrateOrMirrorIfEthereumNormalized(address);
      const balance = await sdk.balance.get({ address: ethereumAddress });
      console.log(balance, 'BAL')

      

      console.log(signer, 'SIGNER')
      const freeData = (await provider.getFeeData());
      console.log(freeData, 'FREE_DATA')

      const gasPrice = freeData.gasPrice;
      const sentTx = await signer.sendTransaction({
        to,
        value: amountBigInt,
        // gasPrice,
      })

      const receipt = await sentTx.wait()
      console.log(receipt);
      alert(`Tx sent: ${receipt}`)
    } catch (e: any) {
      console.error(e)
      alert(`Error transferring: ${e.message}`)
    }
  }

  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <h1>Magic Link - Unique Network</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Введите email"
          />
          <button onClick={handleLogin}>Enter</button>
        </div>
      ) : (
        <div>
          <h1>Auth</h1>
          <p>Email: {userMetadata.email}</p>
          <button onClick={() => transfer('0xe2D683AC11D5A3271469Ae363FE464a9dcAe4404', 1)}>Do action)</button>
          <button onClick={handleLogout}>Log out</button>
        </div>
      )}
    </div>
  );
};

export default MagicLogin;
