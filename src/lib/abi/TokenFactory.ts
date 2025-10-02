export const TokenFactoryAbi = [
	{
		inputs: [
			{ internalType: "string", name: "name_", type: "string" },
			{ internalType: "string", name: "symbol_", type: "string" },
			{ internalType: "uint8", name: "decimals_", type: "uint8" },
			{ internalType: "uint256", name: "cap_", type: "uint256" },
			{ internalType: "address", name: "owner_", type: "address" },
			{ internalType: "address", name: "initialRecipient_", type: "address" },
			{ internalType: "uint256", name: "initialSupply_", type: "uint256" },
		],
		name: "createToken",
		outputs: [{ internalType: "address", name: "token", type: "address" }],
		stateMutability: "nonpayable",
		type: "function",
	},
    {
        inputs: [
            { internalType: "string", name: "name_", type: "string" },
            { internalType: "string", name: "symbol_", type: "string" },
            { internalType: "address", name: "owner_", type: "address" },
        ],
        name: "createNFT",
        outputs: [{ internalType: "address", name: "token", type: "address" }],
        stateMutability: "nonpayable",
        type: "function",
    },
	{
		anonymous: false,
		inputs: [
			{ indexed: true, internalType: "address", name: "token", type: "address" },
			{ indexed: true, internalType: "address", name: "owner", type: "address" },
			{ indexed: false, internalType: "string", name: "name", type: "string" },
			{ indexed: false, internalType: "string", name: "symbol", type: "string" },
			{ indexed: false, internalType: "uint8", name: "decimals", type: "uint8" },
			{ indexed: false, internalType: "uint256", name: "cap", type: "uint256" },
		],
		name: "TokenCreated",
		type: "event",
	},
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "token", type: "address" },
            { indexed: true, internalType: "address", name: "owner", type: "address" },
            { indexed: false, internalType: "string", name: "name", type: "string" },
            { indexed: false, internalType: "string", name: "symbol", type: "string" },
        ],
        name: "NftCreated",
        type: "event",
    },
] as const;



