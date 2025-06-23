require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    ganache: {
      url: process.env.GANACHE_URL || "http://127.0.0.1:7545",
      chainId: parseInt(process.env.GANACHE_CHAIN_ID) || 1337,
      accounts: process.env.GANACHE_PRIVATE_KEY
        ? [`0x${process.env.GANACHE_PRIVATE_KEY.replace(/^0x/, "")}`]
        : [],
    },
  },
};
