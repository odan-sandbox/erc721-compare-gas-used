// @ts-check
require("@nomiclabs/hardhat-waffle");
import "solidity-coverage"
import "hardhat-jest-plugin";
// declaration merging で hre.ethers を生やしているので反映する
import "@nomiclabs/hardhat-ethers"

import { HardhatUserConfig } from "hardhat/config";
import {task} from "hardhat/config"
import {Contract}  from "@ethersproject/contracts"
import {HardhatRuntimeEnvironment} from "hardhat/types"

async function getDeployGasUsed(hre: HardhatRuntimeEnvironment, contract: Contract) {
  const txReceipt = await hre.ethers.provider.getTransactionReceipt(contract.deployTransaction.hash)

  return txReceipt.gasUsed.toString()
}


async function getMintGasUsed(hre: HardhatRuntimeEnvironment, contract: Contract) {
  const accounts = await hre.ethers.getSigners();

  const tx = await contract.functions["mint(address,uint256)"](accounts[0].address, 1);
  const txReceipt = await hre.ethers.provider.getTransactionReceipt(tx.hash)

  return txReceipt.gasUsed.toString()
}

async function getTransferFromGasUsed(hre: HardhatRuntimeEnvironment, contract: Contract) {
  const accounts = await hre.ethers.getSigners();

  await contract.functions["mint(address,uint256)"](accounts[0].address, 10);
  const tx = await contract.functions["transferFrom(address,address,uint256)"](accounts[0].address, accounts[1].address, 10);

  const txReceipt = await hre.ethers.provider.getTransactionReceipt(tx.hash)

  return txReceipt.gasUsed.toString()
}


task("measure", "deploy/mint/transferFrom のコストを計測").setAction(async (_, hre) => {
  const contractNames = [
    "Basic",
    "CaseBurnable",
    "CaseEnumerable",
    "CaseMetadata",
    "CasePausable"
  ]

  for (const contractName of contractNames) {
    const contract = await hre.ethers.getContractFactory(contractName);
    const instance = await contract.deploy();

    await instance.deployed();

    console.log(contractName)
    console.log("deploy", await getDeployGasUsed(hre, instance))
    console.log("mint", await getMintGasUsed(hre, instance))
    console.log("transferFrom", await getTransferFromGasUsed(hre, instance))

  }
})

function getAccounts() {
  const privateKey = process.env.PRIVATE_KEY
  if (privateKey) {
    return [privateKey]
  }
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.5.17",
    settings: {
      optimizer: {
        enabled: false,
        runs: 1000
      }
    }
  },
  networks: {
    hardhat: {
      hardfork: "muirGlacier"
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/60d0008ec52149f5a639ba70fc6086df",
      accounts: getAccounts()
    }
  },
}

export default config;

