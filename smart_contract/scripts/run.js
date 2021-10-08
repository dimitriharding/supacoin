const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("SupacoinNFT");
  const nftContract = await nftContractFactory.deploy(
    "Supacoin",
    "SC",
    "http://localhost:3000/api/token/",
    300
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
