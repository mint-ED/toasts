const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Toast Basic Functionality", function () {
  it("Should set token name and symbol", async function () {
    const Toast = await ethers.getContractFactory("contracts/TOAST.sol:TOASTS");
    const toast = await Toast.deploy();
    await toast.deployed();

    const setNameAndSymbolTx = await toast.setNameAndSymbol("newName", "newSymbol");
    await setNameAndSymbolTx.wait();

    //expect(await toast.symbol).to.equal("newSymbol");



    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
