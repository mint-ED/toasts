import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
} from "./util/interact.js";
import {
  displayTOASTs,
} from "./util/toastCalls";
import {
  getNftsAxios,
} from "./util/toastAxios";

const Display = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  //TODO: using only wallet address supplied in text field.  replace this with wallet address from connected wallet
  const [textboxWalletAddress, setToastsWalletAddress] = useState("");

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

  const onDisplayPressed = async () => {
    const { success, status } = await displayTOASTs(textboxWalletAddress);
    setStatus(status);
    if (success) {
      setToastsWalletAddress("");
    }
  };

  const onAxiosPressed = async () => {
    const result = await getNftsAxios(textboxWalletAddress);
    
  };

  return (
    <div className="Display">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">Get NFTs</h1>
      <p>
        Press 'Display TOASTs' to display your TOASTs"
      </p>
      <form>
        <h2>✍️ Wallet Address: </h2>
        <input
          type="text"
          placeholder="enter wallet address here"
          onChange={(event) => setToastsWalletAddress(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onAxiosPressed}>
        Display TOASTs
      </button>
      <p id="status" style={{ color: "red" }}>
        {status}
      </p>


      <br></br>
      <h1 id="title">This works with balanceOf fake call</h1>
      <p>
        Press 'Display TOASTs' to display your TOASTs"
      </p>
      <form>
        <h2>✍️ Wallet Address: </h2>
        <input
          type="text"
          placeholder="enter wallet address here"
          onChange={(event) => setToastsWalletAddress(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onDisplayPressed}>
        Display TOASTs
      </button>
      <p id="status" style={{ color: "red" }}>
        {status}
      </p>
    </div>
  );
};

export default Display;
