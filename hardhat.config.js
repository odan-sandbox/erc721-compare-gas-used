require("@nomiclabs/hardhat-waffle");

async function getDeployGasUsed(contract) {
  const txReceipt = await ethers.provider.getTransactionReceipt(contract.deployTransaction.hash)

  return txReceipt.gasUsed.toString()
}


async function getMintGasUsed(contract) {
  const accounts = await ethers.getSigners();

  const tx = await contract.functions["mint(address,uint256)"](accounts[0].address, 1);
  const txReceipt = await ethers.provider.getTransactionReceipt(tx.hash)

  return txReceipt.gasUsed.toString()
}


async function getTransferFromGasUsed(contract) {
  const accounts = await ethers.getSigners();

  await contract.functions["mint(address,uint256)"](accounts[0].address, 10);
  const tx = await contract.functions["transferFrom(address,address,uint256)"](accounts[0].address, accounts[1].address, 10);

  const txReceipt = await ethers.provider.getTransactionReceipt(tx.hash)

  return txReceipt.gasUsed.toString()
}



task("deploy", "deploy", async () => {
  const contractNames = [
    "Basic",
    "CaseBurnable",
    "CaseEnumerable",
    "CaseMetadata",
    "CasePausable"
  ]

  for (const contractName of contractNames) {
    const contract = await ethers.getContractFactory(contractName);
    const instance = await contract.deploy();

    await instance.deployed();

    console.log(contractName)
    console.log("deploy", await getDeployGasUsed(instance))
    console.log("mint", await getMintGasUsed(instance))
    console.log("transferFrom", await getTransferFromGasUsed(instance))

  }

})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.5.17",
};

