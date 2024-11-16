const {buildModule} = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ETHGlobalToken", (m) => {
    const token = m.contract("ETHGlobalToken", [
        "USD Coin", // name
        "USDC", // symbol
        6 // decimals
    ]);

    return token;
});
