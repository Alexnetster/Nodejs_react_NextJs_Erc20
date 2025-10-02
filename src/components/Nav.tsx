"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { usePathname } from "next/navigation";

export function Nav() {
	const pathname = usePathname();
	const linkBase = "px-3 py-2 rounded-md text-sm font-medium";
	const active = "bg-black/5 dark:bg-white/10";
	return (
		<nav className="w-full border-b border-black/10 dark:border-white/10">
			<div className="max-w-6xl mx-auto flex items-center justify-between h-14 px-4 gap-4">
				<div className="flex items-center gap-2">
					<Link href="/" className="text-base font-semibold">Token Studio</Link>
					<div className="ml-4 flex items-center gap-1">
						<Link href="/deploy" className={`${linkBase} ${pathname === "/deploy" ? active : ""}`}>Deploy</Link>
						<Link href="/mint" className={`${linkBase} ${pathname === "/mint" ? active : ""}`}>Mint</Link>
						<Link href="/mint-nft" className={`${linkBase} ${pathname === "/mint-nft" ? active : ""}`}>Mint NFT</Link>
					</div>
				</div>
				<ConnectButton />
			</div>
		</nav>
	);
}


