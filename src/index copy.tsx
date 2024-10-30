import React from 'react'
import ReactDOM from 'react-dom';
import { init, useConnectWallet } from '@subwallet-connect/react'
import injectedModule from '@subwallet-connect/injected-wallets'
import { ethers } from 'ethers'
import { ApiPromise, WsProvider } from '@polkadot/api';
import { SubstrateProvider, EIP1193Provider } from "@subwallet-connect/common";
import walletConnectModule from '@subwallet-connect/walletconnect'

// Sign up to get your free API key at https://explorer.blocknative.com/?signup=true
// Required for Transaction Notifications and Transaction Preview
const apiKey = '1730eff0-9d50-4382-a3fe-89f0d34a2070';
const wcInitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: 'f7355c4a8483073af9629880e7887524',
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  requiredChains: [1],
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  optionalChains: [8882,8881,8880],
  /**
   * Defaults to `appMetadata.explore` that is supplied to the web3-onboard init
   * Strongly recommended to provide atleast one URL as it is required by some wallets (i.e. MetaMask)
   * To connect with WalletConnect
   */
  dappUrl: 'http://YourAwesomeDapp.com'
}

// initialize the module with options
const walletConnect = walletConnectModule(wcInitOptions)

const injected = injectedModule()
const ws = 'wss://rpc.polkadot.io'
const infuraKey = '<INFURA_KEY>'
const rpcUrl = `https://mainnet.infura.io/v3/${infuraKey}`



// initialize Onboard
init({
  apiKey,
  wallets: [injected, walletConnect],
  chains: [
    {
      id: '0x22b2', // 8882
      rpcUrl: 'https://rpc-opal.unique.network',
      label: 'OPAL by UNIQUE',
      token: 'OPL',
      namespace: 'evm',
      decimal: 18
    }
    // {
    //   id: '0x1',
    //   token: 'ETH',
    //   label: 'Ethereum Mainnet',
    //   rpcUrl
    // }

  ],
chainsPolkadot:[
    {
      id: '0xc87870ef90a438d574b8e320f17db372c50f62beb52e479c8ff6ee5b460670b9',
      label: 'Opal',
      decimal: 18,
      namespace: 'substrate',
      token: 'OPL',
      blockExplorerUrl: 'scan.uniquenetwork.dev/opal/'
    }
]
})

function App() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

  // create an ethers provider
  let ethersProvider;
  let substrateApi;

 if (wallet?.type === 'evm') {
    // if using ethers v6 this is:
    ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
} else if(wallet?.type === 'substrate') {
    substrateApi= new ApiPromise({
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
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
