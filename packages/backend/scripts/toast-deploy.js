const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with this account: ", deployer.address);
  console.log("Account balance: ", (await deployer.getBalance()).toString());

  const Toast = await ethers.getContractFactory("TOASTS");
  const toast = await Toast.deploy();
  await toast.deployed();

  console.log("Toast deployed to:", toast.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
