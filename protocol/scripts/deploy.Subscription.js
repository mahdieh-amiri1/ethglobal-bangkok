// scripts/deploy.js

const hre = require("hardhat");
let owner;

async function main() {
  const [owner] = await hre.ethers.getSigners(); // Changed from hre.signers to hre.ethers.getSigners()

  // Define the constructor parameters
  const endpoint = "0x6EDCE65403992e310A62460808c4b910D972f10f"; // Replace with the actual LayerZero endpoint address
  //   const delegate = "0xYourDelegateAddress"; // Replace with the actual delegate address

  // Compile the contract if needed
  await hre.run("compile");

  // Get the contract factory
  const Subscription = await hre.ethers.getContractFactory("Subscription");

  // Deploy the contract
  console.log("Deploying Subscription contract...");
  const subscription = await Subscription.deploy(endpoint, deployer.address);

  console.log(`Subscription deployed to: ${subscription.target}`);
}

// Run the script
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
