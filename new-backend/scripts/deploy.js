// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // 1. Instead of ethers.getSigners(), pull that unlocked address directly:
  const deployer = await hre.ethers.provider.getSigner("0x109241Fb46A87305ABc4F826caD35D7D79c784A9");

  console.log("Deploying from account:", await deployer.getAddress());

  // 2. Check its balance
  const balance = await hre.ethers.provider.getBalance(await deployer.getAddress());
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  // 3. Deploy with that signer
  const Factory = await hre.ethers.getContractFactory("IdentityVerification");
  const contract = await Factory.connect(deployer).deploy();

  await contract.waitForDeployment();
  console.log("IdentityVerification deployed to:", await contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment error:", error);
    process.exit(1);
  });
