import { KmsProvider } from "aws-kms-provider";
import env, { ethers } from "hardhat";
import { HttpNetworkConfig } from "hardhat/types";
import { Basic } from "../types/ethers-contracts/";

function KmsSigner() {
  const region = "us-east-1";
  const keyId = "e9005048-475f-4767-9f2d-0d1fb0c89caf";

  const url = (env.network.config as HttpNetworkConfig).url;
  console.log({ url });
  const kmsProvider = new KmsProvider(url, { region, keyIds: [keyId] });

  const provider = new ethers.providers.Web3Provider(kmsProvider);
  return provider.getSigner(0);
}

async function main() {
  /*
    deploy: https://ropsten.etherscan.io/tx/0x2fb0e582c24af127e5a237bec340bdb93def894c0b20e835d9d4e43077230771
    addMinter: https://ropsten.etherscan.io/tx/0xadfdd282f5f37a0bd7d6186162c7789d6328faca7196b283da46af41d8198f85
  */
  const signer = KmsSigner();
  const to = "0xa802b07c1B5dd0e0E57911c3fB7911a7BCff6622";
  const contractAddress = "0x69c25CF26Ce2261740Cf6f3BD48C5e143C1F95Aa";
  const basic = (await ethers.getContractAt(
    "Basic",
    contractAddress,
    signer
  )) as Basic;

  await basic.deployed();

  console.log(basic);

  const tokenId = Math.ceil(Math.random() * 100000);
  const tx = await basic.functions.mint(to, tokenId);
  console.log(tx);

  // console.log(await tx.wait());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
