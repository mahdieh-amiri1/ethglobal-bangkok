const {buildModule} = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Oracle", (m) => {
    const config = {
        pythContract: "0x4374e5a8b9C22271E9EB878A2AA31DE97DF15DAF",
        ethPriceFeedId: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    };

    const oracle = m.contract("Oracle", [
        config.pythContract, // Pyth contract address
        config.ethPriceFeedId, // ETH Price feed ID
    ]);

    return oracle;
});
