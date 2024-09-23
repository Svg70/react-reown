import React from 'react'
import { createAppKit } from '@reown/appkit/react'
import { EVMEthers5Client } from '@reown/appkit-adapters-ethers'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'


const projectId = 

// 2. Create a function to fetch the Blockchain API RPC URL
function getBlockchainApiRpcUrl(chainId: number) {
  return `https://rpc.walletconnect.org/v1/?chainId=eip155:${chainId}&projectId=${projectId}`
}

const chains = [
  {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: getBlockchainApiRpcUrl(1),
    chainNamespace: 'eip155'
  },
  {
    chainId: 42161,
    name: 'Arbitrum',
    currency: 'ETH',
    explorerUrl: 'https://arbiscan.io',
    rpcUrl: getBlockchainApiRpcUrl(42161),
    chainNamespace: 'eip155'
  },
  {
    chainId: 8880,
    name: 'Unique Mainnet',
    currency: 'UNQ',
    explorerUrl: 'https://unique.subscan.io/',
    rpcUrl: 'https://rpc.unique.network',
    chainNamespace: 'eip155'
  },
]

// 3. Create a metadata object - optional
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers Adapter
const ethersAdapter = new EthersAdapter()

// 5. Create a AppKit instance
createAppKit({
  adapters: [ethersAdapter],
  networks: chains,
  projectId,
  themeMode: 'light',
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export default function ButtonW3M() {
  return <>
    <w3m-button></w3m-button>
  </> //make sure you have configured the <w3m-button> inside
}