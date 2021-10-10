const TOKEN_BASE_URI = process.env.TOKEN_BASE_URI;
const GENERATED_TOKENS_COUNT = process.env.GENERATED_TOKENS_COUNT;
const NFT_COLLECTION_NAME = process.env.NFT_COLLECTION_NAME;
const NFT_COLLECTION_SYMBOL = process.env.NFT_COLLECTION_SYMBOL;

const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("SupacoinNFT");
  const nftContract = await nftContractFactory.deploy(
    NFT_COLLECTION_NAME,
    NFT_COLLECTION_SYMBOL,
    TOKEN_BASE_URI,
    parseInt(GENERATED_TOKENS_COUNT), // convert to int since it was read as a string
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
