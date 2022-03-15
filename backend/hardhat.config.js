require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

//var chai = require('chai');

//require('@openzeppelin/hardhat-upgrades');
require('dotenv').config()

const MUMBAI_ALCHEMY_URL  = process.env.MUMBAI_ALCHEMY_URL;
const MUMBAI_DEV_KEY      = process.env.MUMBAI_DEV_KEY;
const GANACHE_URL         = process.env.GANACHE_URL;
//const GANACHE_URL       = "http://127.0.0.1:7545"

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
        accounts: [`${MUMBAI_DEV_KEY}`]
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
