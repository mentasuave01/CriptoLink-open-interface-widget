//set type iterface for PriceCL props
"use client";
import { Token, Hash } from "../types/dApp";
import { useContractRead } from "wagmi";
import { formatUnits, parseUnits } from "ethers";
import { useMemo, useState } from "react";
import { Placeholder } from "./Placeholder";
import DestinationData from "./DestinationData";

interface PriceCLProps {
  token: Token;
  oToken: Token | undefined;
  tokenAmount: number | string | undefined;
  label: string;
  setoData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
  setdData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
}

const w2wABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_tokenIn",
        type: "address",
      },
      {
        name: "_amount",
        type: "uint256",
      },
      {
        name: "_destChain",
        type: "uint256",
      },
    ],
    name: "getSourceViewData",
    outputs: [
      {
        name: "_amountInInStable",
        type: "uint256",
      },
      {
        name: "_amountOutInPaper",
        type: "uint256",
      },
      {
        name: "_amountOutInStable",
        type: "uint256",
      },
      {
        name: "_sourceFeeInPaper",
        type: "uint256",
      },
      {
        name: "_sourceFeeInStable",
        type: "uint256",
      },
      {
        name: "_expressSourceFeeInPaper",
        type: "uint256",
      },
      {
        name: "_expressSourceFeeInStable",
        type: "uint256",
      },
      {
        name: "_cccDexDiscount",
        type: "uint256",
      },
      {
        name: "_cccTBaaSDiscount",
        type: "uint256",
      },
      {
        name: "_enabledChains",
        type: "uint256[]",
      },
      {
        name: "_minPaperForChain",
        type: "uint256[]",
      },
      {
        name: "_minStableForChain",
        type: "uint256[]",
      },
      {
        name: "_sourcePath",
        type: "address[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

//create DTokenAmount props interface

export default function PriceCL({
  token,
  oToken,
  tokenAmount = 1,
  label,
  setoData,
  setdData,
}: PriceCLProps) {
  let contractAddress = "";
  let usdDecimals = 6;
  let explorer = "";
  switch (label === "From" ? token?.chainId : oToken?.chainId) {
    case 43114: //avax
      contractAddress = "0x00985F0F2739edc2cF1A386fed09D7dA696855cd";
      break;
    case 56: //bsc-default
      contractAddress = "0xD5E6145fb824cc5CA3E1BE58291E2549Fc735265";
      usdDecimals = 18;
      break;
    case 42220: //celo-default
      contractAddress = "0x2B2BbC29D0134e7E7761ee15d91BC002a3cc2225";
      usdDecimals = 18;
      break;
    case 250: //ftm-6
      contractAddress = "0xA5773865BC9cF2924cCC79725889B7d61cB160C4";
      usdDecimals = 7;
      break;
    case 25: //cronos
      contractAddress = "0xd8F0571a12768F98cA20fb428038eF855238e719";
      break;
    case 1666600000: //harmony
      contractAddress = "0x60f068ce8b085444F29F40b723A2f149960Ac20F";
      break;
    case 137: //polygon
      contractAddress = "0x52a5b08860737d82D01e9aa76C20F7a0CA22e98f";
      break;
    case 1088: //metis
      contractAddress = "0x7E0133cC920B1E3D368844007f6B09464fD95a5a";
      break;
    case 42262: //oasis
      contractAddress = "0xA0B4c420C1449837ec82A8307a53e9Df9288b37D";
      break;

    default:
      break;
  }

  const [error, setError] = useState("");
  const amount = tokenAmount
    ? parseUnits(Number(tokenAmount).toFixed(token?.decimals), token?.decimals)
    : 0;
  const contractArguments =
    label == "From"
      ? [token?.address, amount, 56]
      : [oToken?.address, amount, token?.chainId];
  const { data }: any = useContractRead({
    address: contractAddress as Hash,
    abi: w2wABI,
    functionName: "getSourceViewData",
    args: contractArguments,
    onError() {
      setError("amount below minimum");
    },
    onSuccess() {
      setError("");
    },
  });
  const DTokenAmount = ({}) => {
    return (
      <div>
        {dataInfo ? (
          <DestinationData
            token={token}
            dataInfo={dataInfo}
            setdData={setdData}
          />
        ) : (
          <Placeholder />
        )}
      </div>
    );
  };

  // // console.log("🚀 ~ file: PriceCL.tsx:133 ~ PriceCL ~ data:", data);
  label == "From" && data
    ? setoData([...data, contractAddress, amount, usdDecimals])
    : null;
  const dataInfo = data ? data : undefined;
  const totalPrice = data
    ? Number(formatUnits(data[0], usdDecimals)).toFixed(2) + "$"
    : "loading...";
  const reloadTest = useMemo(() => {
    return <DTokenAmount />;
  }, [dataInfo]);
  return (
    <div>{label === "From" ? (error ? error : totalPrice) : reloadTest}</div>
  );
}
