# mintED TOASTs (Tokens of Appreciation)

coming soon

## Installation

coming soon

### Backend

```sh
tbd
```

### Frontend

```sh
tbd
```

## Configuration

coming soon

```js
tbd
```

## Notes to clean up and move to above sections

Config Instructions:

setNameAndSymbol:  change based on client deployment.  default is mintED/TOAST

*Configure Token*

setTokenMaxSupply:  
-don't call:  unlimited semi-fungible token
-1:  1of1 NFT (similar to ERC721 standard)
->1: limited supply semi-fungible token


*Set Token Uris*

setTokenURIOption (1 is default, used for images in same folder.  3 is used for one-offs (like TOASTs))

For Option 3 (specific uri for a token- only one token at this address)

    setTokenIdToURI (new token id, uri to json)   uri format:  ipfs://[location]/[tokenid].[tokenExtension]
    example:  ipfs://QmPhhpWRKPz4FkBABEGWABh9SUkAnZC5GPJ1gkpYoSvENS/0.json


*Give a Toast (mint)*

toastSingleToSingle
to: receiver
id: tokenId (e.g. 0)
amount: token quantity (e.g. 1)
data: 0x0




initial setup: 

```shell
npm init --yes
npm install --save-dev hardhat
npm install --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
npm install dotenv --save
npx hardhat
```

dotenv setup: 

```shell
create .env file on root of backend folder
add apikey, other keys
add in hardhat.config.js:  require('dotenv').config() 
```


#update hardhat.config.js 

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

to enable optimization

 module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

###deployment
updated default network to ganache, using 127.0.0.1:7545.  must have ganache installed and running

npx hardhat run .\scripts\toast-deploy.js --network ganache


This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```









