<<<<<<< HEAD

# toasts

=======

# mintED TOASTS Frontend POC

## About this project

<br/>

<p>
    The intention of this app is to build a basic frontend to support the creation and management of ERC1155-based NFTs.  These NFTs are distributed as tokens of appreciation (TOASTs) by owners of a Toast application. 
  </p>

<p>
    Note that this app is still a work in progress.  Contributions welcome! 
  </p>

  <p>
    The app will have the following components:
  </p>

- Viewer: User views the Toasts in their wallet
- Explorer: User views NFTs in any wallet/contract combo
- Creator: Admin creates and distributes Toasts

<p>
  This project is based the Alchemy NFT API, and is generally a fork of their repo <a href="https://github.com/alchemyplatform/Build-Your-NFT-Explorer/">here</a>
</p>

## Key Components

<br/>

- React: javascript framework for frontend development
- Tailwind: CSS framework
- Alchemy API: library for obtaining NFT data
- Node.js: the project runs on node and requires node.js 16.13.x
  <br/>

## Installation

Follow these steps to setup this repo:

### Prerequisites

- Node >= 16.13.x

### Installation

1. Clone the github repo:
   ```sh
   git clone https://github.com/mint-ED/minted-frontend-poc.git
   ```
2. CD into the project's root folder and install the dependencies:
   ```sh
   npm install
   ```
3. Setup (free) account on [Alchemy.com](https://www.alchemy.com/):

   - The Alchemy API provides access to the GetNFTs API used in our app.
   - Create an account. Then under the Dashboard click Create App.
   - Enter a Name and Description.
   - Environment: Development. Chain: Polygon. Network: Mainnet.
   - After the App is setup, click on View Key and copy the HTTP url. You'll use this in the next step.

4. Create config file

   - Rename the file ".env.example" to ".env.local".
   - In the file's first line, create the following entry: REACT_APP_ALCHEMY_POLYGON_MUMBAI="your-alchemy-key-goes here"

5. Run the application
   ```sh
   npm start
   ```

<!-- USAGE EXAMPLES -->

## Usage

The Toasts app will contain the following functionality:

- <b>Explorer</b>
  - <u>Desired Fuctionality:</u> provide a Wallet Address and Contract Addresss, and return all NFTs associated with the wallet/contract combo. Wallet Address must be provided, but Contract Address is optional.
  - <u>Current State:</u> Working as expected.
  - <u>Test It Out:</u> sample wallet/contract are provided on the page.
  - <u>Next Steps:</u> make this a more engaging user experience.
- <b>Viewer</b>
  - <u>Desired Fuctionality:</u>Connect your wallet, which then displays the NFTs in your wallet associated with the Toasts smart contract (which is pulled from project config and not provided by the user).
  - <u>Current State:</u> Very clunky and partially complete. Metamask wallet connect works, though this value then needs to be copy/pasted into the textbox.
  - <u>Test It Out:</u> sample wallet is provided on the page.
  - <u>Next Steps:</u> Desired state is to remove the textbox and 'display my toasts' button and just refresh the page with NFTs once the wallet is connected.
- <b>Creator</b>
  - <u>Desired Fuctionality:</u> Ad admin, upon connecting via Metamask, can view existing Toasts, create new Toasts, and airdrop Toasts to wallets.
  - <u>Current State:</u> Not started.
  - <u>Test It Out:</u> n/a.
  - <u>Next Steps:</u> This will require integration into the Toasts smart contract.

<!-- CONTRIBUTING -->

## Contributing

We welcome contributions to our project!

We follow basic open source best practices for contributing: creating a fork of our project, cloning, creating a new branch, issuing a pull request.

[See here](https://www.dataschool.io/how-to-contribute-on-github/) for a good explanation of our contribution guidelines.

Please identify an issue from our [issues](https://github.com/mint-ED/minted-frontend-poc/issues) list in this repo, create a new branch, and have fun!

## License

Distributed under the MIT License.

## Contact

- [gotminted.xyz](https://www.gotminted.xyz) - our website, with contact form
- [@gotmintED](https://twitter.com/gotmintED) - twitter

This repo was originally created by the team at Alchemy:

- [@VittoStack](https://twitter.com/VittoStack)
- [@thatguyintech](https://twitter.com/thatguyintech)

> > > > > > > frontend/main
