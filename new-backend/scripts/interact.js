const hre = require("hardhat");

async function main() {
  const contractAddress = "0xdD798765daF10dCD7b50b5bBc5f682997805214b";
  const IdentityVerification = await hre.ethers.getContractAt("IdentityVerification", contractAddress);
  
  // Example: Register a new user
  const tx = await IdentityVerification.registerUser(
    "testuser",
    "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3", // SHA-256 hash of "123"
    "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"  // Same test hash
  );
  await tx.wait();
  console.log("User registered successfully!");
}

main().catch(console.error);