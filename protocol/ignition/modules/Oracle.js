const {buildModule} = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Oracle", (m) => {
    const networksConfig = {
        ethereum_sepolia: {
            name: 'ethereum_sepolia',
            pythContract: "0xDd24F84d36BF92C65F92307595335bdFab5Bbd21",
            ethPriceFeedId: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
        },
        base_sepolia: {
            name: 'base_sepolia',
            pythContract: "0xA2aa501b19aff244D90cc15a4Cf739D2725B5729",
            ethPriceFeedId: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
        },
        arbitrum_sepolia: {
            name: 'arbitrum_sepolia',
            pythContract: "0x4374e5a8b9C22271E9EB878A2AA31DE97DF15DAF",
            ethPriceFeedId: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
        },
    };

    let oracles = {}
    for (const [network, config] of Object.entries(networksConfig)) {
        try {
            const oracle = m.contract("Oracle", [
                config.pythContract, // Pyth contract address
                config.ethPriceFeedId, // ETH Price feed ID
            ]);

            oracles[network] = oracle;
        } catch (error) {
            console.error(`Failed to deploy to network: ${network}`, error);
        }
    }

    return oracles;
});
