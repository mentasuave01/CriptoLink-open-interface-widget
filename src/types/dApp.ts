"use client";
type Hash = `0x${string}`;

type Token =
  | {
      address: Hash | undefined;
      chainId: number;
      name: string;
      symbol: string;
      decimals: number;
      logoURI: string;
    }
  | undefined;

export type { Token, Hash };
