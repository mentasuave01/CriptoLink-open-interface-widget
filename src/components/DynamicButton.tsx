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
import { ConnectKitButton } from "connectkit";
import { useEffect, useState } from "react";
import Sucess from "./Sucess";

function SwapIt({
  oData,
  oToken,
  dData,
  dToken,
  explorerURL,
}: DynamicButtonProps) {
  const { address } = useAccount();

  const swapABI = [
    {
      constant: false,
      inputs: [
        {
          name: "_chain",
          type: "uint256",
        },
        {
          name: "_recipient",
          type: "address",
        },
        {
          name: "_tokenIn",
          type: "address",
        },
        {
          name: "_amountIn",
          type: "uint256",
        },
        {
          name: "_tokenOut",
          type: "address",
        },
        {
          name: "_minTokenOut",
          type: "uint256",
        },
        {
          name: "_minStartPaper",
          type: "uint256",
        },
        {
          name: "_source",
          type: "address",
        },
        {
          name: "_express",
          type: "bool",
        },
        {
          name: "_data",
          type: "bytes",
        },
      ],
      name: "swap",
      outputs: [
        {
          name: "_txId",
          type: "uint256",
        },
      ],
      payable: true,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const [text, setText] = useState("SWAP");
  const [sucess, setSucess] = useState(false);
  const source_address = localStorage.getItem(`source`);
  const [hash, setHash] = useState<Hash>();

  const contractArguments = [
    dToken?.chainId,
    address, //address owner
    oToken?.address,
    oData[14], //amountIn
    dToken?.address,
    oData[8], //minTokenOut
    oData[8], //minStartPaper
    source_address, //source
    false, //express
    [], //calldata
  ];

  const { config } = usePrepareContractWrite({
    address: oData[13],
    abi: swapABI,
    functionName: "swap",
    args: contractArguments,
    chainId: oToken?.chainId,
    value:
      oToken?.address == "0x0000000000000000000000000000000000000000"
        ? oData[14]
        : BigInt(0),

    onSuccess(data) {
      console.log("Success", data);
    },
    onError(error) {
      if (typeof error === "string") {
        console.log("Error", error);
      } else {
        console.log("Error", JSON.stringify(error));
      }
    },
  });
  const {
    data: writeContractResult,
    writeAsync: approveAsync,
    isLoading: swapLoading,
    isSuccess: swapSuccess,
  } = useContractWrite(config);

  const { isLoading: isApproving } = useWaitForTransaction({
    hash: writeContractResult ? writeContractResult.hash : undefined,
    onSuccess(data) {
      console.log(data);
      console.log(writeContractResult?.hash);
      setHash(writeContractResult?.hash);
      setSucess(true);
    },
  });

  async function handleSwap() {
    // console.log("handleSwap");

    try {
      if (approveAsync) {
        await approveAsync();
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <button className={`dynamicHover dynamicConnect  `} onClick={handleSwap}>
        {!swapLoading && !isApproving && text}

        {swapLoading || isApproving ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <p>SWAPING</p>
            <svg
              className="spinner"
              width="25px"
              height="25px"
              viewBox="0 0 66 66"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="path"
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                cx="33"
                cy="33"
                r="30"
              ></circle>
            </svg>
          </div>
        ) : null}
      </button>
      {sucess && (
        <Sucess
          close={function (): void {
            setSucess(false);
          }}
          explorerURL={explorerURL.concat(hash as string)}
        />
      )}
    </>
  );
}

function Allowance({
  oData,
  oToken,
  dData,
  dToken,
  explorerURL,
}: DynamicButtonProps) {
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
    isLoading: approveLoading,
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
    async () => {
      await approveAsync();
    };

    return (
      <button
        onClick={async () => {
          await approveAsync();
        }}
        className={`dynamicConnect dynamicHover`}
      >
        {!approveLoading && !isApproving && "Approve"}
        {approveLoading || isApproving ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <p>Approving</p>
            <svg
              className="spinner"
              width="25px"
              height="25px"
              viewBox="0 0 66 66"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="path"
                fill="none"
                strokeWidth="6"
                strokeLinecap="round"
                cx="33"
                cy="33"
                r="30"
              ></circle>
            </svg>
          </div>
        ) : null}{" "}
      </button>
    );
  } else {
    return (
      <SwapIt
        oToken={oToken}
        oData={oData}
        dToken={dToken}
        dData={dData}
        explorerURL={explorerURL}
      />
    );
  }
}

interface DynamicButtonProps {
  oToken: Token;
  oData: any;
  dToken: Token;
  dData: any;
  explorerURL: string;
}
export const DynamicButton = ({
  oData,
  oToken,
  dData,
  dToken,
}: DynamicButtonProps) => {
  const dbbg = localStorage.getItem("dbbg") ?? "293249";
  const dbbr = localStorage.getItem("dbbr") ?? "7777ff";
  const dbc = localStorage.getItem("dbc") ?? "ffffff";
  const [dynamicState, setDynamicState] = useState("connectKit");
  const [text, setText] = useState("INPUT AMOUNT");
  const [explorerURL, setExplorerURL] = useState("Paco");

  useEffect(() => {
    // console.log(oToken?.chainId);
    switch (oToken?.chainId) {
      case 43114: //avax
        setExplorerURL("https://snowtrace.io/tx/");
        break;
      case 56: //bsc
        setExplorerURL("https://bscscan.com/tx/");
        break;
      case 42220: //(celo)
        setExplorerURL("https://celoscan.io/tx/");
        break;
      case 250: //ftm
        setExplorerURL("https://ftmscan.com/tx/");
        break;
      case 25: //cro)
        setExplorerURL("https://cronoscan.com/tx/");
        break;
      case 166660000: //harmony
        setExplorerURL("https://explorer.harmony.one/tx/");
        break;
      case 137: //polygon
        setExplorerURL("https://polygonscan.com/tx/");
        break;
      case 1088: //metis
        setExplorerURL("https://andromeda-explorer.metis.io/tx/");
        break;
      // case 42262: //oasis
      //   explorerURL = "0x21C718C22D52d0F3a789b752D4c2fD5908a8A733";
      default:
        setExplorerURL("Succes!");
    }
  }, [oToken?.chainId]);

  useEffect(() => {
    if (oToken?.address != undefined && dToken?.address != undefined) {
      if (oData && dData) {
        //load balance from localstorage
        const balance = localStorage.getItem(`balance`);

        if (oData[1] < oData[10][0]) {
          setText("BELOW MINIMUM");
          setDynamicState("connectKit");
        } else if (oData[14] > Number(balance)) {
          setText("INSUFFICIENT BALANCE");
          setDynamicState("connectKit");
        } else {
          setText("SWAP");
          if (oToken?.address == "0x0000000000000000000000000000000000000000")
            setDynamicState("swap");
          else setDynamicState("allowance");
        }
      }
    } else {
      setText("SELECT TOKEN");
    }
  }, [dToken, oData, dData]);
  // console.log("Dynamic State: ", dynamicState);
  switch (dynamicState) {
    case "swap":
      return (
        <>
          <SwapIt
            oToken={oToken}
            oData={oData}
            dToken={dToken}
            dData={dData}
            explorerURL={explorerURL}
          />
        </>
      );

    case "allowance":
      return (
        <Allowance
          oToken={oToken}
          oData={oData}
          dData={dData}
          dToken={dToken}
          explorerURL={explorerURL}
        />
      );
    default:
      return (
        <ConnectKitButton.Custom>
          {({
            isConnected,
            isConnecting,
            show,
            hide,
            address,
            ensName,
            chain,
          }) => {
            return isConnected ? (
              <button
                disabled
                className="dynamicConnect"
                style={{
                  backgroundColor: `#${dbbg}`,
                  borderColor: `#${dbbr}`,
                  color: `#${dbc}`,
                }}
              >
                {text}
              </button>
            ) : (
              <button
                onClick={show}
                className="dynamicConnect"
                style={{
                  backgroundColor: `#${dbbg}`,
                  borderColor: `#${dbbr}`,
                  color: `#${dbc}`,
                }}
              >
                {"Connect Wallet"}
              </button>
            );
          }}
        </ConnectKitButton.Custom>
      );
  }
};
