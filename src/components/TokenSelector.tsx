"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNetwork, useToken, useSwitchNetwork } from "wagmi";
import Loader from "./Loader";
import { Token, Hash } from "../types/dApp";

import { TokenItem } from "./TokenItem";

interface ChainMismatchProps {
  Chain: number | undefined;
  setRenderChainMismatch: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChainMismatch = ({
  Chain,
  setRenderChainMismatch,
}: ChainMismatchProps) => {
  const { switchNetwork } = useSwitchNetwork({
    chainId: Chain,
    onSuccess() {
      setRenderChainMismatch(false);
    },
  });

  const handleSwitchNetwork = () => {
    switchNetwork?.(Chain);
  };

  return (
    <div className="chainMismatch">
      <div className="chainMismatch__content">
        <div className="chainMismatch__title">
          <h1>Wrong Network</h1>
        </div>
        <div className="chainMismatch__actions">
          <button
            className="chainMismatch__button"
            onClick={handleSwitchNetwork}
          >
            Switch Network
          </button>
        </div>
      </div>
    </div>
  );
};

interface CustomTokenItemProps {
  token: Token;
  handleAddCustomToken: (token: Token) => void;
  chain: number | undefined;
}
const CustomTokenItem = ({
  token,
  handleAddCustomToken,
  chain,
}: CustomTokenItemProps) => {
  const { data } = useToken({
    address: token?.address,
  });

  if (!token) return null;
  //console.log(data);
  const newToken = {
    chainId: chain,
    address: token?.address,
    name: data?.name,
    symbol: data?.symbol,
    decimals: data?.decimals,
    logoURI: token?.logoURI || "https://www.svgrepo.com/show/448653/token.svg",
  } as Token;

  return (
    <div className="tokenListItem">
      <img src={newToken?.logoURI} alt={newToken?.name} width={20} />
      <p>{newToken?.symbol}</p>
      <p
        style={{
          overflow: "hidden",
        }}
      >
        {newToken?.name}
      </p>
      <button onClick={() => handleAddCustomToken(newToken)}>Add</button>
    </div>
  );
};

interface TokenSelectorProps {
  setToken: React.Dispatch<React.SetStateAction<Token>>;
  Chain: number | undefined;
  setState: React.Dispatch<React.SetStateAction<string>>;
  label: string;
}
export const TokenSelector = ({
  setToken,
  Chain,
  setState,
  label,
}: TokenSelectorProps) => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork({
    chainId: Chain,
    onSuccess() {
      setRenderChainMismatch(false);
    },
  });
  const [tokens, setTokens] = useState<any>([]);
  const [renderChainMismatch, setRenderChainMismatch] = useState(false);

  const memoizedChain = useMemo(() => {
    if (chain?.id === Chain) {
      //console.log("same chain");
      return chain?.id;
    } else {
      //console.log("different chain");
      label === "From" &&
        (setRenderChainMismatch(true), switchNetwork?.(Chain));
      return Chain;
    }
  }, [Chain]);

  useEffect(() => {
    // Fetch tokens on mount
    let chainURL = "";
    switch (memoizedChain) {
      case 43114: //avax
        chainURL =
          "https://raw.githubusercontent.com/mentasuave01/tokenlist-cryptolink-crosswap-interface/main/avaxList.json";
        break;
      case 56: //bsc
        chainURL =
          "https://raw.githubusercontent.com/mentasuave01/tokenlist-cryptolink-crosswap-interface/main/bscList.json";
        break;
      case 42220: //celo
        chainURL =
          "https://raw.githubusercontent.com/mentasuave01/tokenlist-cryptolink-crosswap-interface/main/celoList.json";
        break;
      case 250: //ftm
        chainURL =
          "https://raw.githubusercontent.com/mentasuave01/tokenlist-cryptolink-crosswap-interface/main/ftmList.json";
        break;
      case 25: //cronos
        chainURL =
          "https://raw.githubusercontent.com/mentasuave01/tokenlist-cryptolink-crosswap-interface/main/cronosList.json";
        break;
      case 1666600000: //harmony
        chainURL =
          "https://raw.githubusercontent.com/mentasuave01/tokenlist-cryptolink-crosswap-interface/main/harmonyList.json";
        break;
      case 137: //polygon
        chainURL =
          "https://raw.githubusercontent.com/mentasuave01/tokenlist-cryptolink-crosswap-interface/main/maticList.json";
        break;
      case 1088: //metis
        chainURL =
          "https://raw.githubusercontent.com/mentasuave01/tokenlist-cryptolink-crosswap-interface/main/metisList.json";
        break;
      case 42262: //oasis
        chainURL =
          "https://raw.githubusercontent.com/mentasuave01/tokenlist-cryptolink-crosswap-interface/main/oasisList.json";
        break;

      default:
        break;
    }
    fetch(chainURL)
      .then((response) => response.json())
      .then((data) => {
        setTokens(data.tokens);
      });
  }, [memoizedChain]);
  const [customTokens, setCustomTokens] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [selectedToken, setSelectedToken] = useState(null);
  const [swap, setSwap] = useState(false);

  const handleTokenSelection = (token: Token) => {
    //console.log(token);
    setToken(token);
    setState("swap");
  };

  const memoizedTokens = useMemo(() => {
    const savedTokens =
      JSON.parse(localStorage.getItem(`customTokens-${Chain}`) as string) || [];
    return [...tokens, ...savedTokens];
  }, [tokens]);

  useEffect(() => {
    if (
      search.startsWith("0x") &&
      search.length === 42 &&
      !memoizedTokens.find((token) => token.address === search)
    ) {
      addCustomToken(search as Hash);
    }
  }, [search, memoizedTokens]);

  let timeoutId: NodeJS.Timeout;
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setSearch(searchValue);
    }, 500);
  };

  const addCustomToken = (address: Hash) => {
    const existingToken = customTokens.find(
      (token: Token) => token?.address === address
    );
    if (existingToken) {
      return;
    }
    setCustomTokens([...customTokens, { address }]);
  };

  const handleAddCustomToken = (token: any) => {
    setTokens([...tokens, token]);
    const savedTokens =
      JSON.parse(localStorage.getItem(`customTokens-${Chain}`) as string) || [];
    localStorage.setItem(
      `customTokens-${Chain}`,
      JSON.stringify([...savedTokens, { ...token, chainId: Chain }])
    );
    setCustomTokens(
      customTokens.filter((t: any) => t?.address !== token.address)
    );
  };

  const filteredTokens = memoizedTokens.filter(
    (token) =>
      (token.name && token.name.toLowerCase().includes(search.toLowerCase())) ||
      token.address.toLowerCase().includes(search.toLowerCase())
  );

  return renderChainMismatch ? (
    <ChainMismatch
      Chain={Chain}
      setRenderChainMismatch={setRenderChainMismatch}
    />
  ) : (
    <div style={{ position: "relative" }}>
      <div className="tokenSearcher">
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="#a19d9d"
              strokeWidth="2"
            ></circle>{" "}
            <path
              d="M11 8C10.606 8 10.2159 8.0776 9.85195 8.22836C9.48797 8.37913 9.15726 8.6001 8.87868 8.87868C8.6001 9.15726 8.37913 9.48797 8.22836 9.85195C8.0776 10.2159 8 10.606 8 11"
              stroke="#c0b4b4"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>{" "}
            <path
              d="M20 20L17 17"
              stroke="#a19d9d"
              strokeWidth="2"
              strokeLinecap="round"
            ></path>{" "}
          </g>
        </svg>
        <input
          className="searchInput"
          type="text"
          onChange={handleSearch}
          placeholder="Search by name or address"
          style={{}}
        />
      </div>
      <div className="tokenList">
        {filteredTokens.length === 0 ? (
          <div className="loaderWrapper">
            <Loader />
          </div>
        ) : (
          <div className="tokenList" id="tokenListInto">
            {filteredTokens.map((token, index) => (
              <TokenItem
                key={index}
                token={token as Token}
                handleTokenSelection={handleTokenSelection}
              />
            ))}
          </div>
        )}
      </div>
      {customTokens.map((token: any, index: number) => (
        <CustomTokenItem
          key={index}
          token={token}
          chain={Chain}
          handleAddCustomToken={handleAddCustomToken}
        />
      ))}
    </div>
  );
};
