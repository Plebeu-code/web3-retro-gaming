const hre = require("hardhat");

async function main() {
  const RoboPunksMMO = await hre.ethers.getContractFactory("RoboPunksMMO");
  const roboPunksMMO = await RoboPunksMMO.deploy();

  await roboPunksMMO.deployed();

  console.log("RoboPunksMMO deployed to:", roboPunksMMO.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
