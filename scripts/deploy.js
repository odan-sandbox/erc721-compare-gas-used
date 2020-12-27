// @ts-check

const hre = require("hardhat");

async function main() {
    const signers = await hre.ethers.getSigners()
    const Basic = await hre.ethers.getContractFactory("Basic");
    const basic = await Basic.deploy();

     await basic.deployed();

    console.log(basic.deployTransaction)

    console.log("basic deployed to:", basic.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
