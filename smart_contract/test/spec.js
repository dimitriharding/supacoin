const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Supacoin Smart Contract", function () {
  let SupacoinSC;
  let supacoinSC;

  before(async function () {
    // create smart contract with constructor values
    SupacoinSC = await ethers.getContractFactory("SupacoinNFT");
    supacoinSC = await SupacoinSC.deploy(
      "Supacoin NFT",
      "SCOINFT",
      "http://localhost:3000/api/token/",
      300
    );

    // wait for deployment to be completed
    await supacoinSC.deployed();
  });

  it("Should have the initialized URI base in the token URI", async function () {
    const mintSupacoinTx = await supacoinSC.mint();

    // wait until the transaction is mined
    await mintSupacoinTx.wait();

    const count = await supacoinSC.getTokenCount();
    const id = await supacoinSC.getPreviousToken();
    const convertedId = id.toNumber();

    expect(count.toNumber()).to.equal(6);
    expect(await supacoinSC.tokenURI(convertedId)).to.equal(
      `http://localhost:3000/api/token/${convertedId}`
    );
  });

  it("Should be able to mint with other accounts", async function () {
    const [, address1] = await ethers.getSigners();

    const mintSupacoinTx = await supacoinSC.connect(address1).mint();

    // wait until the transaction is mined
    await mintSupacoinTx.wait();

    const count = await supacoinSC.getTokenCount();
    const id = await supacoinSC.getPreviousToken();
    const convertedId = id.toNumber();

    expect(count.toNumber()).to.equal(7);
    expect(await supacoinSC.tokenURI(convertedId)).to.equal(
      `http://localhost:3000/api/token/${convertedId}`
    );
  });
});
