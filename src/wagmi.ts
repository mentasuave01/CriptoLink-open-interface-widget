"use client";
import { getDefaultConfig } from "connectkit";
import { configureChains, createConfig } from "wagmi";
import {
  avalanche,
  celo,
  cronos,
  fantom,
  polygon,
  bsc,
  metis,
  harmonyOne,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const walletConnectProjectId = process.env.DB_USER as string;

const { chains } = configureChains(
  [avalanche, celo, cronos, fantom, polygon, bsc, metis, harmonyOne],
  [publicProvider()]
);

export const config = createConfig(
  getDefaultConfig({
    autoConnect: true,
    appName: "CryptoLink",
    appDescription: "CryptoLink",
    appUrl: "https://cryptolink.app",
    appIcon: "https://cryptolink.tech/images/cryptolink-logo2.png",
    chains,
    walletConnectProjectId,
  })
);
