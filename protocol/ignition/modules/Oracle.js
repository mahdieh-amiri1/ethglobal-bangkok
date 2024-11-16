const {buildModule} = require("@nomicfoundation/hardhat-ignition/modules");

const config = {
    ethereum_sepolia: {
        pythContract: "0xDd24F84d36BF92C65F92307595335bdFab5Bbd21",
        ethPriceFeedId: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    },
    base_sepolia: {
        pythContract: "0xA2aa501b19aff244D90cc15a4Cf739D2725B5729",
        ethPriceFeedId: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    },
    arbitrum_sepolia: {
        pythContract: "0x4374e5a8b9C22271E9EB878A2AA31DE97DF15DAF",
        ethPriceFeedId: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    },
};


module.exports = buildModule("Oracle", (m, {network}) => {
    // Retrieve the current network's configuration
    const networkConfig = config[network.name];
    if (!networkConfig) {
        throw new Error(`No configuration found for network: ${network.name}`);
    }

    const oracle = m.contract("Oracle", [
        networkConfig.pythContract, // Pyth contract address
        networkConfig.ethPriceFeedId, // ETH Price feed ID
    ]);

    return {oracle};
});
