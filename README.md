# mintED TOASTS Backend POC

## About this project
<br/>

<p>
    The intention of this app is to build backend to support the creation and management of ERC1155-based NFTs.  These NFTs are distributed as tokens of appreciation (TOASTs) by owners of a Toast application. 
  </p>

<p>
    Note that this app is still a work in progress.  Contributions welcome! 
  </p>

  <p>
    The app has the following cakabilities:
  </p>

* Airdrops.  4 methods to support various address/token combinations
* Exchange.  Exchange (mint/burn) one token for a set of other qualified tokens (this is configurable)
* Open Zeppelin:  other standard contracts, including ERC1155, Access Control, Supply, and others.  

## Key Components
<br/>

* Solidity: standard language of Ethereum smart contract
* Hardhat: used for scripting deployments and testing
* Waffle, Mocha, Chai:  assertion library for Ethereum
<br/>

## Installation

Follow these steps to setup this repo:

### Prerequisites

- Node >= 16.13.x
### Installation

1. Clone the github repo:
   ```sh
   git clone https://github.com/mint-ED/minted-toasts-backend.git
   ```
2. CD into the project's root folder and install the dependencies:
   ```sh
   npm install
   ```
   
3. Setup (free) account on [Alchemy.com](https://www.alchemy.com/):
   - The Alchemy API is used for deploying contracts on remote networks (e.g. Ethereum/Polygon mainnets/testnets).  If all testing and deployments are done locally (hardhat or ganache, this section can be skipped.
   - Create an account.  Then under the Dashboard click Create App.  
   - Enter a Name and Description.  
   - Environment: Development.  Chain: Polygon.  Network: Mainnet. 
   - After the App is setup, click on View Key and copy the HTTP url.  You'll use this in the next step.
  
4. Create config file
   - Rename the file ".env.example" to ".env".
   - If deploying to remote networks, values will be needed for the Alchemy key of the corresponding network.  This app also supports contract validation on etherscan/polygonscan using a hardhat plugin.  
   - See the hardhat docs [here](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html) if etherscan/polygonscan contract validation is required.  

<!-- USAGE EXAMPLES -->
## Usage

This project uses hardhat for contract management. These [docs](https://hardhat.org/tutorial/) from hardhat provide a good introduction on basic contract management tasks.  

To run the Toast test scripts, run the below command.  A network param can be added to test on preferred network (e.g. ganache)

```js
npx hardhat test
```
To deploy the Toast contract, run the below command.  No param deploys to the included hardhad test network.  Other networks can be added in the hardhat.config.js file. 

Note that deploying to a non-local network requires the use of private keys which can be added by adding records to the .env file and uncommenting the relevant comments in the hardhat.config.js file.  

```js
node scripts/toast-deploy.js
```


<!--Token Config -->
## Creating a Token Configuration

Once the Toast contract is deployed, the following methods can be called to configure and distribute tokens.

*Set Contract Name & Symbol*

setNameAndSymbol:  
- pass in new values.  default is mintED/TOAST

*Configure Token*

setTokenMaxSupply: 
- Don't set:  unlimited semi-fungible token
- Max = 1: token is an NFT
- Max > 1: semi-fungible tokens with max supply

*Set Token Uris*

setTokenURIOption
- 1: default, used for images in same folder.  
- 3: used for one-off tokens with metadata in different folders.
- different methods exist for each option

*Give a Toast (mint)*

- toastSingleToSingle: one token to one address
- toastSingleToMany: one token to many addresses (pass arrays)
- toastManyToSingle: many tokens to one address (pass arrays)
- toastManyToMany: many tokens to many addresses (pass arrays)
- note for each method, 0x0 should be passed for the 'data' param

<!-- CONTRIBUTING -->
## Contributing

We welcome contributions to our project!  

We follow basic open source best practices for contributing: creating a fork of our project, cloning, creating a new branch, issuing a pull request.

[See here](https://www.dataschool.io/how-to-contribute-on-github/) for a good explanation of our contribution guidelines.

Please identify an issue from our [issues](https://github.com/mint-ED/minted-toasts-backend/issues) list in this repo, create a new branch, and have fun!
## License

Distributed under the MIT License.

## Contact

 - [gotminted.xyz](https://www.gotminted.xyz) - our website, with contact form
 - [@gotmintED](https://twitter.com/gotmintED) - twitter