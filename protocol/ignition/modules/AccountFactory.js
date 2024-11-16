require("dotenv").config();
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AccountFactory", (m) => {
  const accountFactory = m.contract("AccountFactory");

  return { accountFactory };
});
