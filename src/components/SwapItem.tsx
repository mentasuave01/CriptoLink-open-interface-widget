"use client";
import { useMemo, useState } from "react";
import { useBalance, useAccount } from "wagmi";
import { Token, Hash } from "../types/dApp";
import PriceCL from "./PriceCL";

interface SwapItemProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
  chain: number | undefined;
  label: string;
  token: Token;
  oToken: Token;
  setAmount: React.Dispatch<React.SetStateAction<number | string>>;
  amount: number | string;
  setoData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  setdData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  setBalance: React.Dispatch<React.SetStateAction<BigInt | undefined>>;
}

export function SwapItem({
  setState,
  setAmount,
  setoData,
  setdData,
  amount,
  chain,
  token,
  label,
  oToken,
  setBalance,
}: SwapItemProps) {
  //load sibg from local storage
  const sibg = localStorage.getItem("sibg") ?? "293249";
  const sibbg = localStorage.getItem("sibbg") ?? "182136";
  const sibc = localStorage.getItem("sibc") ?? "ffffff";
  const sic = localStorage.getItem("sic") ?? "ffffff";
  const { connector: activeConnector, address, isConnected } = useAccount();

  const { data } = useBalance({
    address: address as Hash,
    token:
      token?.address != "0x0000000000000000000000000000000000000000"
        ? token?.address
        : ("" as Hash),
    chainId: token?.chainId,
    onSuccess: (data) => {
      if (label === "From") {
        //safe balance in browser cache
        localStorage.setItem("balance", data?.value?.toString() || "0");
      }
    },
  });

  function handleClick() {
    label === "From"
      ? setState("oChainSelection")
      : setState("dChainSelection");
  }

  function handletBalanceClick() {
    setAmount(Number(data?.formatted) || 0);
  }

  const priceComponent = useMemo(() => {
    return (
      <PriceCL
        token={token}
        tokenAmount={amount}
        label={label}
        oToken={oToken}
        setoData={setoData}
        setdData={setdData}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  return (
    <div
      id="oSwapItem"
      className="swapitem"
      style={{
        backgroundColor: `#${sibg}`,
      }}
    >
      <div>
        <div id="oSelector" className="Selector">
          {label === "From" ? (
            <input
              id="oTokenInput"
              style={{
                backgroundColor: `#${sibg}`,
                color: `#${sic}`,
              }}
              className="input"
              type="number"
              placeholder="0"
              step="any"
              autoComplete="off"
              onKeyDown={(event) => {
                const regex = /^(\d*\.?\d*)?$/;
                const key = event.key;
                if (
                  key !== "Backspace" &&
                  key !== "ArrowLeft" &&
                  key !== "ArrowRight" &&
                  key !== "Delete" &&
                  !regex.test(key)
                ) {
                  event.preventDefault();
                }
              }}
              onChange={(e) => {
                e.preventDefault();
                const value = e.target.value;
                if (value === "") {
                  setAmount("");
                } else {
                  setAmount(Number(value));
                }
              }}
              value={amount}
            />
          ) : (
            <div
              style={{
                backgroundColor: `#${sibg} !important`,
              }}
            >
              {priceComponent}
            </div>
          )}

          <button
            className="tokenSelector"
            id="oTokenSelector"
            onClick={isConnected ? handleClick : undefined}
            style={
              isConnected
                ? {
                    cursor: "pointer",
                    backgroundColor: `#${sibbg}`,
                    color: `#${sibc}`,
                  }
                : {
                    cursor: "not-allowed",
                    backgroundColor: `#${sibbg}`,
                    color: `#${sibc}`,
                  }
            }
          >
            {!isConnected ? (
              "Connect Wallet"
            ) : token?.address === undefined ? (
              "Select Token"
            ) : (
              <>
                <img
                  height={25}
                  src={
                    token?.logoURI != ""
                      ? token?.logoURI
                      : "https://www.svgrepo.com/show/448653/token.svg"
                  }
                  style={{
                    borderRadius: "50%",
                  }}
                />
                <span>{token?.symbol}</span>
              </>
            )}
          </button>
        </div>
        {token?.address === undefined || label == "To" ? null : (
          <div id="oBalance" className="tBalance">
            <div>
              {data === undefined ? (
                ""
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "330px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      {priceComponent}
                      &nbsp;
                    </div>
                  </div>
                  <div>
                    {label === "From" ? (
                      <div
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={handletBalanceClick}
                      >
                        {Number(data?.formatted).toFixed(6)}
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
