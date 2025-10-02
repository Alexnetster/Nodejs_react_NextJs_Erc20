"use client";

import { useMemo, useState } from "react";
import { Hex, isAddress, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { SimpleERC20Abi } from "@/lib/abi/SimpleERC20";

export default function MintPage() {
    const [token, setToken] = useState("");
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState<string | null>(null);

    const { address, isConnected } = useAccount();
    const tokenAddress = useMemo(() => (isAddress(token) ? (token as `0x${string}`) : undefined), [token]);

    const { data: decimals } = useReadContract({
        address: tokenAddress,
        abi: SimpleERC20Abi,
        functionName: "decimals",
        query: { enabled: Boolean(tokenAddress) },
    });

    const { data: hash, writeContract, isPending } = useWriteContract();
    const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash: hash as Hex | undefined });

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        if (!isConnected) {
            setError("지갑이 연결되지 않았습니다.");
            return;
        }
        if (!isAddress(token) || !isAddress(recipient)) {
            setError("주소 형식이 올바르지 않습니다.");
            return;
        }
        const d = Number(decimals ?? 18);
        try {
            writeContract({
                address: token as `0x${string}`,
                abi: SimpleERC20Abi,
                functionName: "mint",
                args: [recipient as `0x${string}`, parseUnits(amount, d)],
            });
        } catch (err) {
            const e = err as { shortMessage?: string; message?: string };
            setError(e?.shortMessage || e?.message || "트랜잭션 전송에 실패했습니다.");
        }
    }

    return (
        <div className="max-w-2xl">
            <h1 className="text-xl font-semibold mb-4">ERC‑20 민팅</h1>
            <form onSubmit={onSubmit} className="grid gap-4">
                <label className="grid gap-1">
                    <span className="text-sm">Token Address</span>
                    <input className="border rounded px-3 py-2 bg-transparent" value={token} onChange={(e) => setToken(e.target.value)} required />
                </label>
                <label className="grid gap-1">
                    <span className="text-sm">Recipient</span>
                    <input className="border rounded px-3 py-2 bg-transparent" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
                </label>
                <label className="grid gap-1">
                    <span className="text-sm">Amount</span>
                    <input className="border rounded px-3 py-2 bg-transparent" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </label>
                {typeof decimals === "number" && (
                    <p className="text-sm text-black/70 dark:text-white/70">decimals: {decimals}</p>
                )}
                <button disabled={isPending || isConfirming} type="submit" className="h-10 rounded bg-foreground text-background px-4">
                    {isPending ? "전송 중..." : isConfirming ? "확인 중..." : "민팅"}
                </button>
                {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            </form>
        </div>
    );
}


