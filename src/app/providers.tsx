"use client";

import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig, queryClient } from "@/lib/wagmi";

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<WagmiProvider config={wagmiConfig}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider theme={{ lightMode: lightTheme(), darkMode: darkTheme() }}>
					{children}
				</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	);
}


