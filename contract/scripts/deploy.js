const { ethers, artifacts } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const candidates = ["Alice", "Bob", "Charlie"];
  const EVoting = await ethers.getContractFactory("EVoting");
  const evoting = await EVoting.deploy(candidates);

  await evoting.waitForDeployment();

  const address = await evoting.getAddress();
  console.log(`EVoting deployed to: ${address}`);

  const chainData = {
    address: address,
    abi: (await artifacts.readArtifact("EVoting")).abi,
  };

  // Paths to backend and frontend chain dirs
  const backendDir = path.join(__dirname, "../../backend/src/chain");
  const frontendDir = path.join(__dirname, "../../frontend/src/chain");

  // Ensure directories exist
  if (!fs.existsSync(backendDir)) {
    fs.mkdirSync(backendDir, { recursive: true });
  }
  if (!fs.existsSync(frontendDir)) {
    fs.mkdirSync(frontendDir, { recursive: true });
  }

  // Write files
  fs.writeFileSync(
    path.join(backendDir, "EVoting.json"),
    JSON.stringify(chainData, null, 2)
  );
  fs.writeFileSync(
    path.join(frontendDir, "EVoting.json"),
    JSON.stringify(chainData, null, 2)
  );

  console.log("Contract data written to backend and frontend.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
