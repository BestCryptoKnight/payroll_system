// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const Payment = await hre.ethers.getContractFactory("Payment");
  console.log('start')
  const signer = await hre.ethers.getSigner();
  console.log(signer.address)
  const paymentDeployed = await Payment.deploy("PaymentName", "PAY");

  await paymentDeployed.deployed({ value: hre.ethers.utils.parseEther("0.3") });

  console.log("Payment was deployed to: ", paymentDeployed.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
