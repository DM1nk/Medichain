require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  etherscan:{
apikey:"9YAH28ZFCUDF51SPXERIGMUM28257HBE2U"
  },
  networks:{
    sepolia:{
      url:"https://eth-goerli.g.alchemy.com/v2/VwI99p19tDbWEl79Ig3BHDBw4Gz3-vv0",
      accounts:["2b22d68cd2d0173a122dcfe5a03f49de1dcf33586a87c7db8939d38989b1e0c8"],
    }
  }
};
