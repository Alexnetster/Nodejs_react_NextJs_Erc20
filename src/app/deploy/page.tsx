"use client";

import { useEffect, useMemo, useState } from "react";
import { isAddress, parseUnits, decodeEventLog, Hex, Log } from "viem";
import { useAccount, useChainId, useChains, useSwitchChain } from "wagmi";
import { getFactoryAddress } from "@/lib/contracts";
import { TokenFactoryAbi } from "@/lib/abi/TokenFactory";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

export default function DeployPage() {
    const chainId = useChainId();
    const { address, isConnected } = useAccount();
	const chains = useChains();
	const { switchChain } = useSwitchChain();

	const [selectedChainId, setSelectedChainId] = useState<number | undefined>(chainId);
	const [name, setName] = useState("");
	const [symbol, setSymbol] = useState("");
	const [decimals, setDecimals] = useState("18");
	const [initialSupply, setInitialSupply] = useState("");
	const [initialRecipient, setInitialRecipient] = useState("");
    const [cap, setCap] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [info, setInfo] = useState<string | null>(null);

	const { data: hash, writeContract, isPending } = useWriteContract();
	const { data: receipt, isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

    const createdTokenAddress = useMemo<`0x${string}` | undefined>(() => {
		if (!receipt) return undefined;
		for (const log of receipt.logs as Array<Pick<Log, "data" | "topics">>) {
            try {
				const parsed = decodeEventLog({ abi: TokenFactoryAbi as any, data: log.data as Hex, topics: log.topics as unknown as [Hex, ...Hex[]] });
				if ((parsed as unknown as { eventName: string }).eventName === "TokenCreated") {
					return (parsed as unknown as { args: { token: `0x${string}` } }).args.token;
                }
            } catch {
                // ignore
            }
		}
		return undefined;
	}, [receipt]);

	useEffect(() => {
		setSelectedChainId(chainId);
	}, [chainId]);

	useEffect(() => {
		if (!initialRecipient && address) setInitialRecipient(address);
	}, [address, initialRecipient]);

	const decimalNum = useMemo(() => {
		const d = Number(decimals);
		return Number.isFinite(d) ? d : NaN;
	}, [decimals]);

	function getExplorerBase(id: number | undefined): string | undefined {
		if (!id) return undefined;
		const found = chains.find((c) => c.id === id);
		return found?.blockExplorers?.default?.url;
	}

	function getEffectiveFactory(id: number | undefined): `0x${string}` | undefined {
		if (!id) return undefined;
		return getFactoryAddress(id);
	}

    function validate(): string | null {
		if (!name.trim()) return "Name을 입력하세요.";
		if (!symbol.trim()) return "Symbol을 입력하세요.";
		if (!Number.isInteger(decimalNum) || decimalNum < 0 || decimalNum > 18) return "Decimals는 0~18 사이의 정수여야 합니다.";
		if (!initialSupply.trim()) return "Initial Supply를 입력하세요.";
		if (!isAddress(initialRecipient)) return "Initial Recipient 주소가 올바르지 않습니다.";
		try {
			parseUnits(initialSupply, decimalNum);
		} catch {
			return "Initial Supply 형식이 올바르지 않습니다.";
		}
		if (!selectedChainId) return "네트워크를 선택하세요.";
		return null;
	}

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault();
        setError(null);
        setInfo(null);
        if (!isConnected) {
            setError("지갑이 연결되지 않았습니다. 우측 상단 Connect로 먼저 연결하세요.");
            return;
        }
        const err = validate();
		if (err) {
            setError(err);
			return;
		}
        if (selectedChainId && selectedChainId !== chainId) {
            try {
                setInfo("체인 전환 요청을 보냈습니다. 지갑에서 승인해 주세요...");
                await switchChain({ chainId: selectedChainId });
            } catch {
                setError("체인 전환에 실패했습니다. 지갑에서 허용해주세요.");
                return;
            }
        }
		const factory = getEffectiveFactory(selectedChainId);
		if (!factory) {
			setError("현재 체인의 Factory Address가 설정되지 않았습니다. .env(NEXT_PUBLIC_FACTORY_ADDRESS_<CHAIN_ID>)에 설정 후 다시 시도하세요.");
			return;
		}
		try {
			const ownerAddr = (address ?? initialRecipient) as `0x${string}`;
			const recipientAddr = initialRecipient as `0x${string}`;
			writeContract({
				address: factory,
				abi: TokenFactoryAbi,
				functionName: "createToken",
                chainId: selectedChainId,
				args: [
					name,
					symbol,
					Number(decimalNum),
					cap ? parseUnits(cap, decimalNum) : parseUnits("0", decimalNum),
					ownerAddr,
					recipientAddr,
					parseUnits(initialSupply, decimalNum),
				],
			});
            setInfo("트랜잭션을 지갑에서 확인/승인하세요.");
        } catch (err) {
            const e = err as { shortMessage?: string; message?: string };
            setError(e?.shortMessage || e?.message || "트랜잭션 전송에 실패했습니다.");
		}
	}

	return (
		<div className="max-w-2xl">
			<h1 className="text-xl font-semibold mb-4">ERC‑20 토큰 배포</h1>
			<form onSubmit={onSubmit} className="grid gap-4">
				<label className="grid gap-1">
					<span className="text-sm">Network</span>
					<select
						className="border rounded px-3 py-2 bg-transparent"
						value={selectedChainId ?? ""}
						onChange={(e) => setSelectedChainId(Number(e.target.value))}
					>
						<option value="" disabled>체인을 선택하세요</option>
						{chains.map((c) => (
							<option key={c.id} value={c.id}>{c.name}</option>
						))}
					</select>
				</label>
				{/* Factory Address 입력 제거: 환경변수만 사용 */}
				<label className="grid gap-1">
					<span className="text-sm">Name</span>
					<input className="border rounded px-3 py-2 bg-transparent" value={name} onChange={(e) => setName(e.target.value)} required />
				</label>
				<label className="grid gap-1">
					<span className="text-sm">Symbol</span>
					<input className="border rounded px-3 py-2 bg-transparent" value={symbol} onChange={(e) => setSymbol(e.target.value)} required />
				</label>
				<div className="grid grid-cols-2 gap-4">
					<label className="grid gap-1">
						<span className="text-sm">Decimals</span>
						<input
							className="border rounded px-3 py-2 bg-transparent"
							inputMode="numeric"
							value={decimals}
							onChange={(e) => setDecimals(e.target.value.replace(/[^0-9]/g, ""))}
							required
						/>
					</label>
					<label className="grid gap-1">
						<span className="text-sm">Initial Supply</span>
						<input className="border rounded px-3 py-2 bg-transparent" value={initialSupply} onChange={(e) => setInitialSupply(e.target.value)} required />
					</label>
				</div>
				<label className="grid gap-1">
					<span className="text-sm">Cap (최대 총량, 옵션)</span>
					<input className="border rounded px-3 py-2 bg-transparent" value={cap} onChange={(e) => setCap(e.target.value)} placeholder="미설정 시 0" />
				</label>
				<label className="grid gap-1">
					<span className="text-sm">Initial Recipient</span>
					<input className="border rounded px-3 py-2 bg-transparent" value={initialRecipient} onChange={(e) => setInitialRecipient(e.target.value)} required />
				</label>
                <button disabled={isPending || isConfirming} type="submit" className="h-10 rounded bg-foreground text-background px-4">
					{isPending ? "전송 중..." : isConfirming ? "확인 중..." : "배포"}
				</button>
                {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
                {info && <p className="text-sm text-black/70 dark:text-white/70">{info}</p>}
				{hash && (
					<p className="text-sm break-all">
						tx: {hash} {(() => {
							const base = getExplorerBase(selectedChainId ?? chainId);
							return base ? (
								<a className="underline ml-2" href={`${base}/tx/${hash}`} target="_blank" rel="noreferrer">Etherscan에서 보기</a>
							) : null;
						})()}
					</p>
				)}
				{(() => {
					const base = getExplorerBase(selectedChainId ?? chainId);
					const factoryAddr = getEffectiveFactory(selectedChainId ?? chainId);
					if (!factoryAddr) return null;
					return (
						<p className="text-sm break-all">
							factory: {factoryAddr} {base ? (
								<a className="underline ml-2" href={`${base}/address/${factoryAddr}`} target="_blank" rel="noreferrer">Etherscan에서 보기</a>
							) : null}
						</p>
					);
				})()}
				{createdTokenAddress && (
					<div className="grid gap-2">
						<p className="text-sm break-all">
							token: {createdTokenAddress} {(() => {
								const base = getExplorerBase(selectedChainId ?? chainId);
								return base ? (
									<a className="underline ml-2" href={`${base}/address/${createdTokenAddress}`} target="_blank" rel="noreferrer">Etherscan에서 보기</a>
								) : null;
							})()}
						</p>
						<button
							type="button"
							className="h-9 rounded border px-3"
							onClick={async () => {
								try {
									const eth = (window as unknown as {
										ethereum?: { request?: (args: { method: string; params?: unknown }) => Promise<unknown> };
									}).ethereum;
									await eth?.request?.({
										method: "wallet_watchAsset",
										params: {
											type: "ERC20",
											options: { address: createdTokenAddress, symbol, decimals: Number(decimalNum) },
										},
									});
								} catch (e) {
									const msg = e instanceof Error ? e.message : "지갑에 토큰 추가 실패";
									alert(msg);
								}
							}}
						>
							MetaMask에 토큰 추가
						</button>
					</div>
				)}
			</form>
		</div>
	);
}


