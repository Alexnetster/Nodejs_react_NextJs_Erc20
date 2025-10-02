"use client";

import { http } from "viem";
import { mainnet, sepolia } from "wagmi/chains";
import { createConfig } from "wagmi";
import { injected } from "wagmi/connectors";
import { QueryClient } from "@tanstack/react-query";

export const wagmiConfig = createConfig({
	chains: [sepolia, mainnet],
	connectors: [injected()],
	ssr: true,
	transports: {
		[sepolia.id]: http(),
		[mainnet.id]: http(),
	},
});

export const queryClient = new QueryClient();


