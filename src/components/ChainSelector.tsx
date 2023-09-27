"use client";
import { useState, useEffect } from "react";

interface ChainSelectorProps {
  handledChainListClick: (chain: string) => void;
  setdChain:
    | React.Dispatch<React.SetStateAction<number | undefined>>
    | undefined;
  setoChain:
    | React.Dispatch<React.SetStateAction<number | undefined>>
    | undefined;
  label: string;
}

export function ChainSelector({
  handledChainListClick,
  setdChain = undefined,
  setoChain = undefined,
  label,
}: ChainSelectorProps) {
  const chains = {
    // 1: {
    //   name: "Ethereum",
    //   logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=025",
    // },

    56: {
      name: "Binance Smart Chain",
      logo: "https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=025",
    },

    137: {
      name: "Polygon",
      logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=025",
    },
    250: {
      name: "Fantom",
      logo: "https://cryptologos.cc/logos/fantom-ftm-logo.svg?v=025",
    },
    25: {
      name: "Cronos Mainnet Beta",
      logo: "https://cryptologos.cc/logos/cronos-cro-logo.svg?v=025",
    },
    43114: {
      name: "Avalanche",
      logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=025",
    },
    42220: {
      name: "Celo",
      logo: "https://cryptologos.cc/logos/celo-celo-logo.svg?v=025",
    },
    1088: {
      name: "Metis",
      logo: "https://cryptologos.cc/logos/metisdao-metis-logo.svg?v=025",
    },
    1666600000: {
      name: "Harmony",
      logo: "https://cryptologos.cc/logos/harmony-one-logo.svg?v=025",
    },
    // 42262: {
    //   name: "Oasis",
    //   logo: "https://cryptologos.cc/logos/oasis-network-rose-logo.svg?v=025",
    // },
  };

  function handleChainClick(chainId: string) {
    handledChainListClick(chainId);
    label === "From"
      ? setoChain?.(Number(chainId))
      : setdChain?.(Number(chainId));
  }

  return (
    <div id="oToken" className="">
      <div
        style={{
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "bold",
          display: "flex",
          fontFamily: "sans-serif",
          letterSpacing: "0.2rem",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.5rem",
        }}
      >
        {label === "From" ? "ORIGIN NETWORK" : "DESTINATION NETWORK"}
      </div>
      <div id="oButtonsContainer" className="oChainButtonSelector">
        {Object.entries(chains).map(([chainId, chainData]) => (
          <button key={chainId} onClick={() => handleChainClick(chainId)}>
            <img
              src={chainData.logo}
              width={50}
              height={50}
              alt={chainData.name}
            />
            <div
              style={{
                color: "white",
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
            >
              {chainData.name.split(" ")[0]}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
