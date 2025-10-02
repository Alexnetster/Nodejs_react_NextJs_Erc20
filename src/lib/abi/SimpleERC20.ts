export const SimpleERC20Abi = [
	{
		name: "decimals",
		inputs: [],
		outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
		stateMutability: "view",
		type: "function",
	},
	{
		name: "mint",
		inputs: [
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "amount", type: "uint256" },
		],
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
] as const;




