"use client";

import { useMemo, useState } from "react";
import { Hex, isAddress } from "viem";
import { useAccount } from "wagmi";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { SimpleERC721Abi } from "@/lib/abi/SimpleERC721";

export default function MintNftPage() {
    const [token, setToken] = useState("");
    const [recipient, setRecipient] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [tokenURI, setTokenURI] = useState("");
    const [error, setError] = useState<string | null>(null);

    const { isConnected } = useAccount();
    const tokenAddress = useMemo(() => (isAddress(token) ? (token as `0x${string}`) : undefined), [token]);

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
        const idNum = Number(tokenId);
        if (!Number.isInteger(idNum) || idNum < 0) {
            setError("tokenId는 0 이상의 정수여야 합니다.");
            return;
        }
        if (!tokenURI.trim()) {
            setError("tokenURI를 입력하세요.");
            return;
        }
        try {
            writeContract({
                address: tokenAddress!,
                abi: SimpleERC721Abi,
                functionName: "mint",
                args: [recipient as `0x${string}`, BigInt(idNum), tokenURI],
            });
        } catch (err) {
            const e = err as { shortMessage?: string; message?: string };
            setError(e?.shortMessage || e?.message || "트랜잭션 전송에 실패했습니다.");
        }
    }

    return (
        <div className="max-w-2xl">
            <h1 className="text-xl font-semibold mb-4">ERC‑721 민팅</h1>
            <form onSubmit={onSubmit} className="grid gap-4">
                <label className="grid gap-1">
                    <span className="text-sm">NFT Contract Address</span>
                    <input className="border rounded px-3 py-2 bg-transparent" value={token} onChange={(e) => setToken(e.target.value)} required />
                </label>
                <label className="grid gap-1">
                    <span className="text-sm">Recipient</span>
                    <input className="border rounded px-3 py-2 bg-transparent" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
                </label>
                <label className="grid gap-1">
                    <span className="text-sm">Token ID</span>
                    <input className="border rounded px-3 py-2 bg-transparent" value={tokenId} onChange={(e) => setTokenId(e.target.value.replace(/[^0-9]/g, ""))} required />
                </label>
                <label className="grid gap-1">
                    <span className="text-sm">Token URI</span>
                    <input className="border rounded px-3 py-2 bg-transparent" value={tokenURI} onChange={(e) => setTokenURI(e.target.value)} placeholder="https://.../metadata.json" required />
                </label>
                <button disabled={isPending || isConfirming} type="submit" className="h-10 rounded bg-foreground text-background px-4">
                    {isPending ? "전송 중..." : isConfirming ? "확인 중..." : "민팅"}
                </button>
                {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            </form>
        </div>
    );
}




