const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Core Contract", function () {
  it("Should configure accounts correctly", async function () {
    const [owner] = await ethers.getSigners();
    const Toast = await ethers.getContractFactory("contracts/TOAST.sol:TOASTS");
    const toast = await Toast.deploy();
    await toast.deployed();

    //can use to verify owner account is set correctly
    //expect(await owner.address).to.equal("0x53fDd45246F79D252E311CB0717E90A039493fec");  

  });
});

describe("Toast Basic Contract Functionality", function () {
  it("Should check initial deploy name/symbol are the default and can be updated", async function () {
    const Toast = await ethers.getContractFactory("contracts/TOAST.sol:TOASTS");
    const toast = await Toast.deploy();
    await toast.deployed();

    //check defaults
    expect(await toast.name()).to.equal("mintED Toasts");
    expect(await toast.symbol()).to.equal("TOASTS");

    //verify setter/getter with good data
    const tx = await toast.setNameAndSymbol("NewName", "NewSymbol");
    await tx.wait();

    expect(await toast.name()).to.equal("NewName");
    expect(await toast.symbol()).to.equal("NewSymbol");
  });
});

describe("Toast Uri Functionality", function () {
  it("Should check that initial UriOption equals 1", async function () {
    const Toast = await ethers.getContractFactory("contracts/TOAST.sol:TOASTS");
    const toast = await Toast.deploy();
    await toast.deployed();

    expect(await toast.tokenURIOption()).to.equal("1");
  });

  it("Should check the ability to update the UriOption to 3", async function () {
    const Toast = await ethers.getContractFactory("contracts/TOAST.sol:TOASTS");
    const toast = await Toast.deploy();
    await toast.deployed();

    const setTokenURIOptionTx = await toast.setTokenURIOption(3);
    await setTokenURIOptionTx.wait();

    expect(await toast.tokenURIOption()).to.equal("3");
  });
});

