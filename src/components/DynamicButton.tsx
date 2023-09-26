"use client";
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import { Token, Hash } from "../types/dApp";
import { ConnectKitButton } from "connectkit";
import { useEffect, useState } from "react";

function SwapIt({ oData, oToken, dData, dToken }: DynamicButtonProps) {
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
  const source_address = localStorage.getItem(`source`);

  const contractArguments = [
    dToken?.chainId,
    address, //address owner
    oToken?.address,
    oData[14], //amountIn
    dToken?.address,
    oData[8], //minTokenOut
    oData[8], //minStartPaper
    address, //source
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
      MySwal.fire({
        title: "Success",
        text: "Your swap was successful " + `${writeContractResult?.hash}`,
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        window.location.reload();
      });
    },
  });

  async function handleSwap() {
    console.log("handleSwap");

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
    </>
  );
}

function Allowance({ oData, oToken, dData, dToken }: DynamicButtonProps) {
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
      <SwapIt oToken={oToken} oData={oData} dToken={dToken} dData={dData} />
    );
  }
}

interface DynamicButtonProps {
  oToken: Token;
  oData: any;
  dToken: Token;
  dData: any;
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
  const [swapStatus, setSwapStatus] = useState("idle");
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
  console.log("Dynamic State: ", dynamicState);
  switch (dynamicState) {
    case "swap":
      return (
        <SwapIt oToken={oToken} oData={oData} dToken={dToken} dData={dData} />
      );
    case "allowance":
      return (
        <Allowance
          oToken={oToken}
          oData={oData}
          dData={dData}
          dToken={dToken}
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
