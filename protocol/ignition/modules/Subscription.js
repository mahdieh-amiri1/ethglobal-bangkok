require("dotenv").config();
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const { SUBSCRIPTION_ENDPOINT, SUBSCRIPTION_OWNER } = process.env;

module.exports = buildModule("Subscription", (m) => {
  const subscription = m.contract("Subscription", [
    SUBSCRIPTION_ENDPOINT,
    SUBSCRIPTION_OWNER,
  ]);

  return { subscription };
});
