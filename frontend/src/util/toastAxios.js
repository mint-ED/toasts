const axios = require('axios');

require('dotenv').config({ path: '../../.env' })

const polygonMainnetURL = process.env.POLYGON_MAINNET_URL;

console.log("url i'm getting:", polygonMainnetURL);
const baseURL = `${polygonMainnetURL}/getNFTs/`;

// Replace with the wallet address you want to query for NFTs:
//const ownerAddr = "0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c";
const contractAddresses = ["0xa4A04947869D8201da08e5d9abfF0c5bA78689C5"];


export const getNftsAxios = async(textboxWalletAddress) => {

    // Construct the axios request:
    var config = {
        method: 'get',
        url: `${baseURL}?owner=${textboxWalletAddress}&contractAddresses[]=${contractAddresses}`
    };

    // TODO: use the wallet address passed in
    return axios(config)
    .then(response => console.log(JSON.stringify(response.data, null, 2)))
    .catch(error => console.log(error));  
};

// try {
//     const txHash = await window.ethereum.request({
//       method: "eth_sendTransaction",
//       params: [transactionParameters],
//     });
//     return {
//       success: true,
//       status:
//         "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
//         txHash,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       status: "😥 Something went wrong: " + error.message,
//     };
//   }