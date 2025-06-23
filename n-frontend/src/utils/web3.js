import { BrowserProvider, Contract } from 'ethers';
import IdentityVerification from '../contracts/IdentityVerification.json';

export async function connectMetaMask() {
  if (typeof window.ethereum === 'undefined') {
    throw new Error("MetaMask is not installed");
  }

  await window.ethereum.request({ method: 'eth_requestAccounts' });

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const contractAddress = "0xf7a6653d2a94E59Ea375D272F514ed2E4081B2E9";

  const contract = new Contract(contractAddress, IdentityVerification.abi, signer);

  return { provider, signer, contract };
}
