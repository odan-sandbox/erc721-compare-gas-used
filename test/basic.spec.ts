import hre from "hardhat";
import "@nomiclabs/hardhat-ethers";
import { waffleJest } from "@ethereum-waffle/jest";
import { Basic__factory as BasicFactory } from "../types/ethers-contracts/factories/Basic__factory";
expect.extend(waffleJest);

describe("Basic", function () {
  it("poyo", async () => {
    const Basic = (await hre.ethers.getContractFactory(
      "Basic"
    )) as BasicFactory;
    const basic = await Basic.deploy();

    await basic.deployed();
    console.log(basic.address);
    expect(basic.address).toBeDefined();
  });
});
