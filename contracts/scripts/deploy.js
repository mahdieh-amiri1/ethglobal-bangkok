// scripts/deploy.js

const hre = require("hardhat");

async function main() {
    // Define the constructor parameters
    const endpoint = "0xYourEndpointAddress"; // Replace with the actual LayerZero endpoint address
    const delegate = "0xYourDelegateAddress"; // Replace with the actual delegate address

    // Compile the contract if needed
    await hre.run("compile");

    // Get the contract factory
    const MsgAndRead = await hre.ethers.getContractFactory("MsgAndRead");

    // Deploy the contract
    console.log("Deploying MsgAndRead contract...");
    const msgAndRead = await MsgAndRead.deploy(endpoint, delegate);

    await msgAndRead.deployed();

    console.log(`MsgAndRead deployed to: ${msgAndRead.address}`);
}

// Run the script
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
