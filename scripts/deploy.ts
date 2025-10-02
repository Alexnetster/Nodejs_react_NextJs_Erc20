import hardhat from "hardhat";
const { ethers } = hardhat;

async function main() {
	const factory = await ethers.deployContract("TokenFactory");
	await factory.waitForDeployment();
	console.log("TokenFactory:", await factory.getAddress());
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});



