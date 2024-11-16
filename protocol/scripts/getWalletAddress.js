require("dotenv").config();
const { Wallet, ethers, Contract } = require("ethers");

const { AF_ABI } = require("./abis/AccountFactory");

const AF_ADDRESS = "0x4d543D4028079a89094F0d5067383490cf0Eef79";

const RPC_URL = "https://base-sepolia-rpc.publicnode.com";
const { PRIVATE_KEY } = process.env;
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
const signerWallet = new Wallet(PRIVATE_KEY, provider);
const accountFactory = new Contract(AF_ADDRESS, AF_ABI, signerWallet);

async function getWalletAddress(owner) {
  const wallet_address = await accountFactory.functions.getAddress(owner);
  return wallet_address.toString();
}

module.exports = {
  getWalletAddress,
  accountFactory,
};
