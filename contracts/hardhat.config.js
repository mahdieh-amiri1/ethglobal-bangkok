require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const fs = require("fs");

const PRIVATE_KEY = process.env.PRIVATE_KEY; //fs.readFileSync('.secret').toString().trim();

const DEPLOYER = PRIVATE_KEY;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    arbitrum_sepolia: {
      url: "https://api-sepolia.arbiscan.io/api",
      accounts: [PRIVATE_KEY],
      // browserURL: "https://sepolia-explorer.arbitrum.io/",
      deployment: {
        name: "LZARB",
        symbol: "LZA",
        mingasToTransfer: 300000000000000,
        lzEndpointAddress: "0x6EDCE65403992e310A62460808c4b910D972f10f",
        chainID: 421614,
      },
    },

    amoy: {
      url: "https://polygon-amoy.drpc.org",
      accounts: [process.env.PRIVATE_KEY],
      deployment: {
        name: "LZPOL",
        symbol: "LZP",
        mingasToTransfer: 300000000000000,
        lzEndpointAddress: "0x6EDCE65403992e310A62460808c4b910D972f10f",
        chainID: 40267,
      },
    },
    avalancheFuji: {
      url: `https://43113.rpc.hypersync.xyz`,
      chainId: 43113,
      accounts: [DEPLOYER],
      deployment: {
        name: "LZARB",
        symbol: "LZA",
        mingasToTransfer: 300000000000000,
        lzEndpointAddress: "0x6EDCE65403992e310A62460808c4b910D972f10f",
        chainID: 40106,
      },
    },
    optimismGoerli: {
      url: `https://sepolia.optimism.io/`,
      chainId: 11155420,
      accounts: [DEPLOYER],
      deployment: {
        name: "LZOP",
        symbol: "LZO",
        mingasToTransfer: 300000000000000,
        lzEndpointAddress: "0x6EDCE65403992e310A62460808c4b910D972f10f",
        chainID: 40232,
      },
    },
    sepolia: {
      url: `https://rpc.ankr.com/eth_sepolia`,
      chainId: 11155111,
      accounts: [DEPLOYER],
      deployment: {
        name: "LZSEP",
        symbol: "LZSE",
        mingasToTransfer: 300000000000000,
        lzEndpointAddress: "0x6EDCE65403992e310A62460808c4b910D972f10f",
        chainID: 40161,
      },
    },
    scrollSepolia: {
      url: `https://scroll-sepolia.blockpi.network/v1/rpc/public`,
      chainId: 534351,
      accounts: [DEPLOYER],
      deployment: {
        name: "LZSCR",
        symbol: "LZS",
        mingasToTransfer: 300000000000000,
        lzEndpointAddress: "0x6098e96a28E02f27B1e6BD381f870F1C8Bd169d3",
        chainID: 534351,
      },
    },
    Bnb: {
      url: `https://rpc.ankr.com/bsc`,
      chainId: 56,
      accounts: [DEPLOYER],
      deployment: {
        name: "LZBSC",
        symbol: "LZB",
        mingasToTransfer: 300000000000000,
        lzEndpointAddress: "0x3c2269811836af69497E5F486A85D7316753cf62",
        chainID: 56,
      },
    },
  },
};
