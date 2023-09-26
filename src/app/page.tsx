"use client";
import { Hash, Token } from "../types/dApp";
import { useState, useMemo } from "react";
import Swap from "../components/Swap";
import { TokenSelector } from "../components/TokenSelector";
import { ChainSelector } from "../components/ChainSelector";
import React from "react";
import { useSearchParams } from "next/navigation";

interface PageProps {}
function Page() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  if (source) {
    localStorage.setItem("source", source);
  } else {
    localStorage.setItem(
      "source",
      "0xa822B308bba268b08b04C40A9774494A78b761D2"
    );
  }
  const logo = searchParams.get("logo");
  if (logo) {
    localStorage.setItem("logo", logo);
  } else {
    localStorage.setItem(
      "logo",
      "https://858a4917.1080p-only-pugswap.pages.dev/pugswap.webp"
    );
  }
  const bg = "#" + searchParams.get("bg");
  if (bg) {
    //window body background-color = bg
    window.document.body.style.backgroundColor = bg;
  } else {
    window.document.body.style.backgroundColor = "#182136;";
  }
  const glow = "#" + searchParams.get("glow");
  if (glow) {
    //window body background-color = bg
    localStorage.setItem("glow", glow);
  } else {
    localStorage.setItem("glow", "#7777ff");
  }
  const fbg = "#" + searchParams.get("fbg");
  if (fbg) {
    localStorage.setItem("fbg", fbg);
  } else {
    localStorage.setItem("fbg", "#182136");
  }
  const sibg = searchParams.get("sibg");
  if (sibg) {
    localStorage.setItem("sibg", sibg);
  } else {
    localStorage.setItem("sibg", "293249");
  }
  const sic = searchParams.get("sic");
  if (sic) {
    localStorage.setItem("sic", sic);
  } else {
    localStorage.setItem("sic", "ffffff");
  }

  const sibbg = searchParams.get("sibbg");
  if (sibbg) {
    localStorage.setItem("sibbg", sibbg);
  } else {
    localStorage.setItem("sibbg", "435278");
  }
  const sibc = searchParams.get("sibc");
  if (sibc) {
    localStorage.setItem("sibc", sibc);
  } else {
    localStorage.setItem("sibc", "ffffff");
  }

  const dbbg = searchParams.get("dbbg");
  if (dbbg) {
    localStorage.setItem("dbbg", dbbg);
  } else {
    localStorage.setItem("dbbg", "435278");
  }
  const dbc = searchParams.get("dbc");
  if (dbc) {
    localStorage.setItem("dbc", dbc);
  } else {
    localStorage.setItem("dbc", "ffffff");
  }
  const dbbr = searchParams.get("dbbr");
  if (dbbr) {
    localStorage.setItem("dbbr", dbbr);
  } else {
    localStorage.setItem("dbbr", "7777ff");
  }

  const [state, setState] = useState("swap");
  const [oToken, setoToken] = useState<Token>({
    address: undefined,
    chainId: 0,
    name: "",
    symbol: "",
    decimals: 0,
    logoURI: "",
  });
  const [dToken, setdToken] = useState<Token>({
    address: undefined,
    chainId: 0,
    name: "",
    symbol: "",
    decimals: 0,
    logoURI: "",
  });
  const [oChain, setoChain] = useState<number | undefined>();
  const [dChain, setdChain] = useState<number | undefined>();

  const swapFrame = useMemo(() => {
    switch (state) {
      case "oChainSelection":
        return (
          <ChainSelector
            handledChainListClick={() => setState("oTokenSelection")}
            setoChain={setoChain}
            setdChain={() => {}}
            label="From"
          />
        );
      case "dChainSelection":
        return (
          <ChainSelector
            handledChainListClick={() => setState("dTokenSelection")}
            setdChain={setdChain}
            setoChain={() => {}}
            label="To"
          />
        );
      case "oTokenSelection":
        return (
          <TokenSelector
            setState={setState}
            setToken={setoToken}
            Chain={oChain}
            label="From"
          />
        );
      case "dTokenSelection":
        return (
          <TokenSelector
            Chain={dChain}
            setState={setState}
            setToken={setdToken}
            label="To"
          />
        );
      case "swap":
        //console.log("SWAP SWAP SWAP SWAP");
        return (
          <Swap
            oToken={oToken}
            dToken={dToken}
            oChain={oChain}
            dChain={dChain}
            setState={setState}
            state={state}
          />
        );

      default:
        return null;
    }
  }, [state]);

  return (
    <main>
      <div id="bbody" className="bbody">
        <div
          id="swapFrame"
          className="swapFrame"
          style={{
            boxShadow: `0 40px 120px 0 ${glow}`,
            backgroundColor: `${fbg}`,
          }}
        >
          {swapFrame}
        </div>
      </div>
    </main>
  );
}

export default React.memo(Page);
