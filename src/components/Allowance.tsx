"use client";

import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Token, Hash } from "../types/dApp";

interface AllowanceProps {
  oToken: Token;
  oData: any;
}
export default function Allowance({ oToken, oData }: AllowanceProps) {
  const { address } = useAccount();
  const w2wContract = oData[13];
  const allowanceAmount = oData[14];
  const MAX_ALLOWANCE = BigInt(2 ** 256 - 1);

  // 1. Read from ERC20 contract. Does spender (0x Exchange Proxy) have an allowance?
  const { data: allowance, refetch } = useContractRead({
    address: oToken?.address,
    abi: erc20ABI,
    functionName: "allowance",
    args: [address as Hash, w2wContract],
  });

  // 2. (Only if no allowance): Write to ERC20, approve
  const { config } = usePrepareContractWrite({
    address: oToken?.address,
    abi: erc20ABI,
    functionName: "approve",
    chainId: oToken?.chainId,
    args: [w2wContract, allowanceAmount],
  });

  const {
    data: writeContractResult,
    writeAsync: approveAsync,
    error,
  } = useContractWrite(config);

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: writeContractResult ? writeContractResult.hash : undefined,
    onSuccess(data) {
      refetch();
    },
  });
  if (
    (allowance === undefined ||
      allowance === BigInt(0) ||
      allowance < oData[14]) &&
    approveAsync
  ) {
    return (
      <>
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          onClick={async () => {
            const writtenValue = await approveAsync();
          }}
        >
          {isApproving ? "Approving..." : "Approve"}
        </button>
      </>
    );
  }
}
