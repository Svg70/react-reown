import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated for React 18
import { init, useConnectWallet } from '@subwallet-connect/react';
import injectedModule from '@subwallet-connect/injected-wallets';
import { ethers } from 'ethers';
import { ApiPromise, WsProvider } from '@polkadot/api';
import walletConnectModule from '@subwallet-connect/walletconnect';
import UniqueChainConfig from './components/Web3Auth';
import { Buffer } from 'buffer';
import { SdkProvider } from './sdk/sdk/SdkContext';
import MagicLogin from './components/MagicLotin';
import Test from './components/apillon/Test';

// Полифилл глобального объекта Buffer для работы в браузере
window.Buffer = window.Buffer || Buffer;


function App() {

  return (
    <div>
      <SdkProvider>
        {/* <UniqueChainConfig/> */}
        {/* <MagicLogin /> */}
        <Test />
      </SdkProvider>
    </div>
  );
}

// ReactDOM for React 18
//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

//ReactDOM.render(<App />, document.getElementById('root'));
