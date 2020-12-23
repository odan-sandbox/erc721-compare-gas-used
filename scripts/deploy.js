const hre = require("hardhat");

async function main() {
    const signers = await hre.ethers.getSigners()
    const MyERC721 = await hre.ethers.getContractFactory("ERC721Mintable");
    const myERC721 = await MyERC721.deploy();

     await myERC721.deployed();

    const deployTransaction = myERC721.deployTransaction;
    console.log(await hre.ethers.provider.getTransactionReceipt(deployTransaction.hash))

    console.log("myERC721 deployed to:", myERC721.address);
    const tx = await myERC721.functions["mint(address,uint256)"](signers[0].address, 1);
    console.log(tx)
    console.log(await hre.ethers.provider.getTransactionReceipt(tx.hash))
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
