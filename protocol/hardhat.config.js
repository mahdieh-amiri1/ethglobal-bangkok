require("dotenv").config();
require("@nomicfoundation/hardhat-ignition-ethers");
require("@nomicfoundation/hardhat-toolbox");

const {
  ETH_SEPOLIA_RPC_NODE,
  BASE_SEPOLIA_RPC_NODE,
  OPTIMISM_SEPOLIA_RPC_NODE,
  ARBITRUM_SEPOLIA_RPC_NODE,
  PRIVATE_KEY,
} = process.env;

module.exports = {
  solidity: "0.8.23",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: ETH_SEPOLIA_RPC_NODE,
      accounts: [PRIVATE_KEY]
    },
    base_sepolia: {
      url: BASE_SEPOLIA_RPC_NODE,
      accounts: [PRIVATE_KEY]
    },
    optimism_sepolia: {
      url: OPTIMISM_SEPOLIA_RPC_NODE,
      accounts: [PRIVATE_KEY]
    },
    arbitrum_sepolia: {
      url: ARBITRUM_SEPOLIA_RPC_NODE,
      accounts: [PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      // Is not required by blockscout. Can be any non-empty string
      sepolia: "S2RQDHR7DPW7Z2ZJY3KM9MPSP2BEQJH252",
      base_sepolia: "FIGBJBHU8V471Q9CBDG7H4RX52DRVQ79H8",
      optimism_sepolia: "abc",
      arbitrum_sepolia: "W2DSBWYAP17VD1FCJGX2X34MXU6QKKCGSP"
    },
    customChains: [
      {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://eth-sepolia.blockscout.com/api",
          browserURL: "https://eth-sepolia.blockscout.com/"
        }
      },
      {
        network: "base_sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://base-sepolia.blockscout.com/api",
          browserURL: "https://base-sepolia.blockscout.com/"
        }
      },
      {
        network: "optimism_sepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://optimism-sepolia.blockscout.com/api",
          browserURL: "https://optimism-sepolia.blockscout.com/"
        }
      },
      {
        network: "arbitrum_sepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia-explorer.arbitrum.io/"
        }
      }
    ]
  },
  sourcify: {
    enabled: false,
  }
};
