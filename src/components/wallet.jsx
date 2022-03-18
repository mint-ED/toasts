import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected
} from "../utils/wallet-connect";
//import {fetchNFTs} from '../utils/fetchNFTs';

const contractAddress = "0xa4A04947869D8201da08e5d9abfF0c5bA78689C5";  //toasts polygon address

const Wallet = (props) => {
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState("");
  const [NFTs, setNFTs] = useState("")

  console.log("Wallet Address: ", owner);

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setOwner(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setOwner(accounts[0]);
          setStatus("Write a message in the text-field above.");
        } else {
          setOwner("");
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
    setOwner(walletResponse.address);
  };

  
  
  return (
    <div className='w-2/6 flex justify-center' >
      <button id="walletButton py-3 bg-white rounded-sm w-full hover:bg-slate-100" onClick={connectWalletPressed} >
        {owner.length > 0 ? (
          "Connected: " +
          String(owner)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
    </div>
  );

  
};

export default Wallet;
