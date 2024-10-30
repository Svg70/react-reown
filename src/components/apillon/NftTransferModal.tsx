import { UniqueNFTFactory } from '@unique-nft/solidity-interfaces';
import React from 'react';
import styled from 'styled-components';
import { getProvider as getEmbeddedProvider } from '@apillon/wallet-sdk';
import { Address } from '@unique-nft/utils';
import { useAccount } from '@apillon/wallet-react';

interface NftTransferModalProps {
  visible: boolean;
  onClose: () => void;
}

const NftTransferModal: React.FC<NftTransferModalProps> = ({ visible, onClose }) => {
  const { username, address } = useAccount();
  const [nftData, setNftData] = React.useState({ tokenId: '', collectionId: '', receiver: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNftData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const signer = await getEmbeddedProvider().getSigner();
    const { tokenId, collectionId, receiver } = nftData;
    //@ts-ignore
    const collection = await UniqueNFTFactory(+collectionId, signer);

    console.log(collection,'collection')
    if (!collection) {
      return;
    }

    const fromCross = Address.extract.ethCrossAccountId(
      address
    );
    console.log(tokenId, 'TOKEN_ID')
    const toCross = Address.extract.ethCrossAccountId(receiver.trim());
    await (
      await collection.transferFromCross(fromCross, toCross, +tokenId)
    ).wait();
    onClose();
  };

  if (!visible) return null;

  return (
    <StyledModalOverlay>
      <StyledModal>
        <StyledCloseButton onClick={onClose}>X</StyledCloseButton>
        <h2>Transfer NFT</h2>
        <StyledInput
          type="number"
          name="tokenId"
          placeholder="Token ID"
          value={nftData.tokenId}
          onChange={handleInputChange}
        />
        <StyledInput
          type="number"
          name="collectionId"
          placeholder="Collection ID"
          value={nftData.collectionId}
          onChange={handleInputChange}
        />
        <StyledInput
          type="text"
          name="receiver"
          placeholder="Receiver Address"
          value={nftData.receiver}
          onChange={handleInputChange}
        />
        <StyledButton onClick={handleSubmit}>Submit NFT Transfer</StyledButton>
      </StyledModal>
    </StyledModalOverlay>
  );
};

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const StyledModal = styled.div`
  background: #1f1f1f;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  color: #fff;
  position: relative;
`;

const StyledCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  background-color: #2c2c2c;
  border: 1px solid #3a3a3a;
  color: #fff;
  font-size: 16px;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

export default NftTransferModal;
