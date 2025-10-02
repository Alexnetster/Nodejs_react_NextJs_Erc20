export const SimpleERC721Abi = [
	{
		name: "tokenURI",
		inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
		outputs: [{ internalType: "string", name: "", type: "string" }],
		stateMutability: "view",
		type: "function",
	},
	{
		name: "mint",
		inputs: [
			{ internalType: "address", name: "to", type: "address" },
			{ internalType: "uint256", name: "tokenId", type: "uint256" },
			{ internalType: "string", name: "uri", type: "string" },
		],
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
] as const;






