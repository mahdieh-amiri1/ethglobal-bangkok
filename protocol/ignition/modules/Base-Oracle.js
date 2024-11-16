const {buildModule} = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Oracle", (m) => {
    const config = {
        pythContract: "0xA2aa501b19aff244D90cc15a4Cf739D2725B5729",
        ethPriceFeedId: "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    };

    const oracle = m.contract("Oracle", [
        config.pythContract, // Pyth contract address
        config.ethPriceFeedId, // ETH Price feed ID
    ]);

    return oracle;
});
