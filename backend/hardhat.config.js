require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
//require('@openzeppelin/hardhat-upgrades');
require('dotenv').config()

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  defaultNetwork: "ganache",
  networks: {
      ganache: {
          url: "http://127.0.0.1:7545",
          // accounts: [privateKey1, privateKey2, ...]
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
