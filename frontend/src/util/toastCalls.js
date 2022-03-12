require("dotenv").config();

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contractABI = require("../abi-toasts.json");
const contractAddress = "0x2Ef23b1b78b1945a854Fa3aD38561C74ad8BdA40";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

export const displayTOASTs = async (textboxWalletAddress) => {
  if (textboxWalletAddress.trim() === "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    };
  }


  




  //to remove?
  const metadata = new Object();
  metadata.toastWalletAddress = textboxWalletAddress;

  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  //this is just a check against contract for balanceOf a currently-hardcoded tokenId to test connectivity 
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .balanceOf(window.ethereum.selectedAddress, 0)
      .encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    });
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    };
  }
};
