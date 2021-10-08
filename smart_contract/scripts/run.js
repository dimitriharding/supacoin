const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("SupacoinNFT");
  const nftContract = await nftContractFactory.deploy(
    "Supacoin Test",
    "SCtestNFT",
    "https://supacoin.vercel.app/api/token-test/",
    300,
    {
      value: hre.ethers.utils.parseEther("0.001"),
    }
  );
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
