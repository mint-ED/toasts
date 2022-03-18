import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected
} from "../utils/wallet-connect";
//import {fetchNFTs} from '../utils/fetchNFTs';

const contractAddress = "0xa4A04947869D8201da08e5d9abfF0c5bA78689C5";  //toasts polygon address

const Wallet = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [NFTs, setNFTs] = useState("")

  console.log("Wallet Address: ", walletAddress);

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  
  
  return (
    <div className='w-2/6 flex justify-center' >
      <button id="walletButton py-3 bg-white rounded-sm w-full hover:bg-slate-100" onClick={connectWalletPressed} >
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
    </div>
  );

  
};

export default Wallet;
