require("dotenv").config();
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const {
  PAYMASTER_ENDPOINT,
  PAYMASTER_OWNER,
  PAYMASTER_ENTRYPOINT,
  PAYMASTER_BUNDLER,
  PAYMASTER_EID,
} = process.env;

module.exports = buildModule("Paymaster", (m) => {
  const paymaster = m.contract("Paymaster", [
    PAYMASTER_ENDPOINT,
    PAYMASTER_OWNER,
    PAYMASTER_ENTRYPOINT,
    PAYMASTER_BUNDLER,
    PAYMASTER_EID,
  ]);

  return { paymaster };
});
