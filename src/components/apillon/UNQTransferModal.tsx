import React from 'react';
import styled from 'styled-components';
import { Address } from '@unique-nft/utils';
import { getProvider as getEmbeddedProvider } from '@apillon/wallet-sdk';
import { UniqueFungibleFactory } from '@unique-nft/solidity-interfaces';
import { ethers } from 'ethers';

interface UNQTransferModalProps {
  visible: boolean;
  onClose: () => void;
  senderAddress: string;
}

const UNQTransferModal: React.FC<UNQTransferModalProps> = ({ visible, onClose, senderAddress }) => {
  const [unqData, setUnqData] = React.useState({ amount: '', receiver: '' });
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUnqData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { amount, receiver } = unqData;

    if (!amount || !receiver) {
      setError('Amount and receiver are required.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const signer = await getEmbeddedProvider().getSigner();
      const from = Address.extract.ethCrossAccountId(senderAddress);
      const to = Address.extract.ethCrossAccountId(receiver);
      //@ts-ignore
      const uniqueFungible = await UniqueFungibleFactory(0, signer);
      const amountRaw = Number(amount) * Math.pow(10, 18);
      const amountNumber = Number(amountRaw)
    
      await (
        await uniqueFungible.transferFromCross(from, to, ethers.parseUnits(String(amountRaw), "wei"), {
          from: senderAddress,
        })
      ).wait();

      alert('UNQ Transfer Successful!');
      onClose();
    } catch (error) {
      console.error('UNQ Transfer Error:', error);
      setError('Failed to transfer UNQ. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <StyledModalOverlay>
      <StyledModal>
        <StyledCloseButton onClick={onClose}>X</StyledCloseButton>
        <h2>Transfer UNQ</h2>
        {error && <ErrorText>{error}</ErrorText>}
        <StyledInput
          type="number"
          name="amount"
          placeholder="Amount"
          value={unqData.amount}
          onChange={handleInputChange}
        />
        <StyledInput
          type="text"
          name="receiver"
          placeholder="Receiver Address"
          value={unqData.receiver}
          onChange={handleInputChange}
        />
        <StyledButton onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Transferring...' : 'Submit UNQ Transfer'}
        </StyledButton>
      </StyledModal>
    </StyledModalOverlay>
  );
};

// Styled Components
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
  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: #ff4d4d;
  margin-bottom: 10px;
`;

export default UNQTransferModal;
