const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Toast Uri Functionality", function () {
  it("Should check initial Uri Option", async function () {
    const Toast = await ethers.getContractFactory("contracts/TOAST.sol:TOASTS");
    const toast = await Toast.deploy();
    await toast.deployed();

    
    expect(await toast.tokenURIOption()).to.equal("1");

    

    // const setTokenIdToTokenUriTx = await toast.setTokenIdToTokenURI(0, "ipfs-test");
    // await setTokenIdToTokenUriTx.wait();

    // expect(await toast.uri(0)).to.equal("ipfs-test");

  });
});
