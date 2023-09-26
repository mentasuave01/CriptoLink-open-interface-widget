"use client";
import { ConnectKitButton } from "connectkit";
import { SetStateAction, useMemo, useState } from "react";
import { DynamicButton } from "./DynamicButton";
import { SwapItem } from "./SwapItem";
import { Token, Hash } from "../types/dApp";

interface SwapProps {
  oToken: Token;
  dToken: Token;
  oChain: number | undefined;
  dChain: number | undefined;
  setState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
}

const Swap = ({
  oToken,

  dToken,

  oChain,

  dChain,

  setState,
}: SwapProps) => {
  const [amount, setAmount] = useState<number | string>("");
  const [oData, setoData] = useState<any[] | undefined>(undefined);
  const [dData, setdData] = useState<any[] | undefined>(undefined);
  const [balance, setBalance] = useState<BigInt | undefined>(undefined);
  const [dialog, setDialog] = useState("SELECT TOKEN");
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const sibbg = localStorage.getItem("sibbg") ?? "293249";
  const sibc = localStorage.getItem("sibc") ?? "000000";

  const swapItem = useMemo(() => {
    return (value: string) => {
      try {
        //add delay to prevent rendering before state is set
        delay(100);
        if (value === "From") {
          //console.log("swapItemFrom");
          return (
            <SwapItem
              setoData={setoData}
              setdData={setdData}
              setBalance={setBalance}
              token={oToken}
              oToken={undefined}
              setState={setState}
              chain={oChain}
              setAmount={setAmount}
              amount={amount}
              label="From"
            />
          );
        } else {
          //console.log("swapItemTo");
          return (
            <SwapItem
              setoData={setoData}
              setdData={setdData}
              setBalance={() => {}}
              token={dToken}
              oToken={oToken}
              setState={setState}
              chain={dChain}
              setAmount={setAmount}
              amount={amount}
              label="To"
            />
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
  }, [amount]);

  const swapItemFrom = swapItem("From");
  const swapItemTo = swapItem("To");
  const logo = localStorage.getItem("logo") || "";

  return (
    <div id="mainframe">
      <div id="navbar" className="navbar">
        <img
          style={{
            padding: "10px",
            borderRadius: "50%",
          }}
          src={logo}
          width={50}
          height={50}
          alt="Picture of the author"
        />

        <ConnectKitButton />
      </div>

      <div>
        {swapItemFrom}

        <div
          className="swapBar"
          style={{
            backgroundColor: `#${sibbg}`,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={`#${sibc}`}
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>

        {swapItemTo}
      </div>
      <br />

      <DynamicButton
        oToken={oToken}
        oData={oData}
        dToken={dToken}
        dData={dData}
      />
    </div>
  );
};

export default Swap;
