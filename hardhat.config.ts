import { config as dotenvConfig } from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenvConfig();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || "";

const networks: Record<string, any> = {};
if (SEPOLIA_RPC_URL) {
	networks.sepolia = {
		url: SEPOLIA_RPC_URL,
		accounts: SEPOLIA_PRIVATE_KEY ? [SEPOLIA_PRIVATE_KEY] : undefined,
	};
}

const config: HardhatUserConfig = {
	solidity: {
		version: "0.8.24",
		settings: {
			optimizer: { enabled: true, runs: 200 },
		},
    },
    networks,
	etherscan: {
		apiKey: {
			sepolia: process.env.ETHERSCAN_API_KEY || "",
		},
	},
};

export default config;


