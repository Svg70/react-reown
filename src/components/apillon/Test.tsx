import React, { useState } from 'react';
import { useAccount, WalletWidget } from '@apillon/wallet-react';
import NftTransferModal from './NftTransferModal';
import UNQTransferModal from './UNQTransferModal';
import styled from 'styled-components';

export default function Test() {
  const { username, address } = useAccount();
  const [showNftModal, setShowNftModal] = useState(false);
  const [showUnqModal, setShowUnqModal] = useState(false);

  return (
    <Wrapper>
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

      <InfoContainer>
        <InfoText><strong>Username:</strong> {username}</InfoText>
        <InfoText><strong>Address:</strong> {address}</InfoText>
      </InfoContainer>

      <ButtonContainer>
        <StyledButton onClick={() => setShowUnqModal(true)}>Transfer UNQ</StyledButton>
        <StyledButton onClick={() => setShowNftModal(true)}>Transfer NFT</StyledButton>
      </ButtonContainer>

      <UNQTransferModal
        visible={showUnqModal}
        onClose={() => setShowUnqModal(false)}
        senderAddress={address}
      />

      <NftTransferModal
        visible={showNftModal}
        onClose={() => setShowNftModal(false)}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f4f4f9;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  font-weight: 600;
`;

const InfoContainer = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const InfoText = styled.p`
  color: #333;
  margin: 5px 0;
  word-wrap: break-word;
  max-width: 300px;
  overflow-wrap: break-word;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
`;
