# Basic Sample Hardhat Project

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
