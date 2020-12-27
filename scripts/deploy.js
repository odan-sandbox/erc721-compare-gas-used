// @ts-check

const hre = require("hardhat");

async function main() {
    const signers = await hre.ethers.getSigners()
    const MyERC721 = await hre.ethers.getContractFactory("MyERC721");
    const myERC721 = await MyERC721.deploy();

     await myERC721.deployed();

    console.log(myERC721.deployTransaction)

    console.log("myERC721 deployed to:", myERC721.address);
    console.log(myERC721.populateTransaction)

    console.log({signers})
    console.log(await myERC721.functions["transferFrom(address,address,uint256)"](signers[0], signers[1], 1))
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
