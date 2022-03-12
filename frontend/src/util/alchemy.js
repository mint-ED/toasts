// alchemy-nft-api/alchemy-web3-script.js
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import 'dotenv/config';

const { APIKEY } = process.env;

//TODO: move this to .env
const urlPolygonDev       = "";  //get from dotenv
const ownerAddr           = "0x534D4e82EA7eCA7F62c3fdf6D39A541be95Bf951";  //wallet we will get from MetaMask frontend
const contractAddresses   = ["0xa4A04947869D8201da08e5d9abfF0c5bA78689C5"]; //main Toasts contract
   
export const getAlchemyNfts = async(JSONBody) => {

    // Initialize an alchemy-web3 instance:
    const web3 = createAlchemyWeb3(
      urlPolygonDev,
  );

  // Query specific wallet and return tokens from a specific contract (optional)
    const nfts = await web3.alchemy.getNfts({
      owner: ownerAddr,
      contractAddresses: contractAddresses
  })

  // Print owner's wallet address:
    console.log("fetching NFTs for address:", ownerAddr);
    console.log("...");

  // Print total NFT count returned in the response:
  console.log("number of NFTs found:", nfts.totalCount);
  console.log("...");


  // Print contract address and tokenId for each NFT:
  for (const nft of nfts.ownedNfts) {
    console.log("===");
    console.log("contract address:", nft.contract.address);
    console.log("token ID:", nft.id.tokenId);
    console.log("token name: ", nft.title);
    console.log("token description: ", nft.description);
    console.log("token type: ", nft.id.tokenMetadata.tokenType);
    console.log("token uri gateway: ", nft.tokenUri.gateway);
    console.log("token image uri: ", nft.metadata.image);
    console.log("===");
  }
};

