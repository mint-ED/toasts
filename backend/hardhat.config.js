require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();
//require('@openzeppelin/hardhat-upgrades');

console.log(process.env.MUMBAI_ALCHEMY_URL);

const MUMBAI_ALCHEMY_URL            = process.env.MUMBAI_ALCHEMY_URL;
const MUMBAI_DEV_KEY                = process.env.MUMBAI_DEV_KEY;
const POLYGON_MAINNET_ALCHEMY_URL   = process.env.POLYGON_MAINNET_ALCHEMY_URL;
const POLYGON_MAINNET_DEV_KEY       = process.env.POLYGON_MAINNET_DEV_KEY;
const GANACHE_URL                   = process.env.GANACHE_URL;
const POLYGONSCAN_API_KEY           = process.env.POLYGONSCAN_API_KEY;
const ETHERSCAN_API_KEY             = process.env.ETHERSCAN_API_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  //defaultNetwork: "ganache",
  networks: {
      ganache: {
          url: `${GANACHE_URL}`,
          // accounts: [privateKey1, privateKey2, ...]
      },
      mumbai: {
        url: `${MUMBAI_ALCHEMY_URL}`,
        //accounts: [`${MUMBAI_DEV_KEY}`]
      },
      polygonmainnet: {
        url: `${POLYGON_MAINNET_ALCHEMY_URL}`,
        //accounts: [`${POLYGON_MAINNET_DEV_KEY}`]
      }
  },
  etherscan: {
    apiKey: {
        //ethereum
        mainnet: `${ETHERSCAN_API_KEY}`,
        ropsten: `${ETHERSCAN_API_KEY}`,
        rinkeby: `${ETHERSCAN_API_KEY}`,
        goerli: `${ETHERSCAN_API_KEY}`,
        kovan: `${ETHERSCAN_API_KEY}`,
        // polygon
        polygon: `${POLYGONSCAN_API_KEY}`,
        polygonMumbai: `${POLYGONSCAN_API_KEY}`,
    }
  },
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
