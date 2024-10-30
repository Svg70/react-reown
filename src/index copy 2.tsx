import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated for React 18
import { init, useConnectWallet } from '@subwallet-connect/react';
import injectedModule from '@subwallet-connect/injected-wallets';
import { ethers } from 'ethers';
import { ApiPromise, WsProvider } from '@polkadot/api';
import walletConnectModule from '@subwallet-connect/walletconnect';

// API Key for WalletConnect
const apiKey = '1730eff0-9d50-4382-a3fe-89f0d34a2070';
const wcInitOptions = {
  projectId: 'f7355c4a8483073af9629880e7887524',
  requiredChains: [1],
  dappUrl: 'https://plate.uniquenetwork.dev'
};

const walletConnect = walletConnectModule(wcInitOptions);
const injected = injectedModule();
const ws = 'wss://rpc.polkadot.io';
const infuraKey = '71f4f2e1e73a4964b1e3e5388263e056';
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`;

// Initialize Onboard
init({
  apiKey,
  wallets: [injected, walletConnect],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl
    }
  ],
  chainsPolkadot: [
    {
      id: '0xc87870ef90a438d574b8e320f17db372c50f62beb52e479c8ff6ee5b460670b9',
      label: 'Opal',
      decimal: 18,
      namespace: 'substrate',
      token: 'OPL',
      blockExplorerUrl: 'https://scan.uniquenetwork.dev/opal/' // Fixed URL format
    }
  ]
});

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  let ethersProvider;
  let substrateApi;

  if (wallet?.type === 'evm') {
    ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any');
  } else if (wallet?.type === 'substrate') {
    substrateApi = new ApiPromise({
      provider: new WsProvider(ws)
    });
  }

  return (
    <div>
      <button
        disabled={connecting}
        onClick={() => (wallet ? disconnect(wallet) : connect())}
      >
        {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
      </button>
    </div>
  );
}

// ReactDOM for React 18
//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

//ReactDOM.render(<App />, document.getElementById('root'));
