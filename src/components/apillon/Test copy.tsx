import React from 'react'
import { useAccount, useWallet, WalletWidget, useContract } from '@apillon/wallet-react';
import TestSdk from './TestSdk';
import { connectSdk } from '../../sdk/sdk/connect';
import { Address } from '@unique-nft/utils';
import { baseUrl } from '../../sdk/sdk/SdkContext';
import { getProvider as getEmbeddedProvider } from "@apillon/wallet-sdk";
import { UniqueFungibleFactory } from '@unique-nft/solidity-interfaces';
import { ethers } from 'ethers';

export default function Test() {
  const { username, address } = useAccount();
  const doSomething = async () => {
    const signer = await getEmbeddedProvider().getSigner();


    const from = Address.extract.ethCrossAccountId(address);
    const to = Address.extract.ethCrossAccountId('5GgJQ2tETLVqq34oQ8nMUgKzdgyeYTDogYGHEhGq93ztmLg3');
    //@ts-ignore
    const uniqueFungible = await UniqueFungibleFactory(0, signer);

    const amountRaw = 1 * Math.pow(10, 18);
    const amountNumber = Number(amountRaw)
  
    await (
      await uniqueFungible.transferFromCross(from, to, ethers.parseUnits(String(amountRaw), "wei"), {
        from: address,
      })
    ).wait();
  };

  return (
    <div>
      test wallet
      <WalletWidget
        clientId={'35f4a624-610f-4166-be0c-c98019621b05'}
        defaultNetworkId={8880}
        networks={[
          {
            name: 'UNQ',
            id: 8880,
            rpcUrl: 'https://rpc.unique.network',
            explorerUrl: 'https://unique.subscan.io/',
          },
        ]}
      />

      <div
        style={{
          margin: '16px 0',
          border: 'solid 1px grey',
        }}
      />

      <p>username: {username}</p>

      <p>address: {address}</p>


      <button onClick={doSomething}>
        transfer funds using sdk
      </button>

      <br />

      <StyledButton></StyledButton>Transfer UNQ</button>

      {/* <TestSdk /> */}

      <br />

      <button>Transfer NFT</button>

      {/* {!!address && <TestViem />} */}

      <br />

      {/* {!!address && <TestEthers6 />} */}

      <br />

      {/* {!!address && <TestEthers5 />} */}
    </div>
  );
}
