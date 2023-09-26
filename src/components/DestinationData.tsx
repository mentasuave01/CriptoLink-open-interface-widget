"use client";
import { useContractRead } from "wagmi";
import { Token, Hash } from "../types/dApp";
import { formatUnits } from "ethers";
const w2wABI = [
  {
    constant: true,
    inputs: [
      {
        name: "_tokenOut",
        type: "address",
      },
      {
        name: "_paperIn",
        type: "uint256",
      },
      {
        name: "_transactionFee",
        type: "uint256",
      },
    ],
    name: "getDestinationViewData",
    outputs: [
      {
        name: "_amountInInStable",
        type: "uint256",
      },
      {
        name: "_amountOutInToken",
        type: "uint256",
      },
      {
        name: "_amountOutInStable",
        type: "uint256",
      },
      {
        name: "_transactionFeeInStable",
        type: "uint256",
      },
      {
        name: "_destPath",
        type: "address[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
interface DestinationDataProps {
  dataInfo: any;
  token: Token;
  setdData: React.Dispatch<React.SetStateAction<any[] | undefined>>;
}
export default function DestinationData({
  dataInfo,
  setdData,
  token,
}: DestinationDataProps) {
  const sibg = localStorage.getItem("sibg") ?? "293249";
  const sic = localStorage.getItem("sic") ?? "ffffff";

  const chain = token?.chainId || 56;
  const tokenOut = () => {
    if (token?.address === "0x0000000000000000000000000000000000000000") {
      switch (chain) {
        case 43114: //avax
          return "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7";
        case 56: //bsc-default
          return "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
        case 42220: //celo-default
          return "0x471ece3750da237f93b8e339c536989b8978a438";
        case 250: //ftm-6
          return "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83";
        case 25: //cronos
          return "0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23";
        case 1666600000: //harmony
          return "0xcf664087a5bb0237a0bad6742852ec6c8d69a27a";
        case 137: //polygon
          return "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270";
        case 1088: //metis
          return "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000";
        case 42262: //oasis
          return "0x21C718C22D52d0F3a789b752D4c2fD5908a8A733";
        default:
          return "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000";
      }
    } else {
      return token?.address;
    }
  };

  let contractAddress = "";
  let usdDecimals = 6;
  switch (chain) {
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
  const paperIn = dataInfo[1];
  const transactionFee = dataInfo[4];

  const contractArguments = [tokenOut(), paperIn, transactionFee];

  const { data }: any = useContractRead({
    address: contractAddress as Hash,
    abi: w2wABI,
    functionName: "getDestinationViewData",
    args: contractArguments,
    chainId: chain,
    onError() {},
    onSuccess() {},
  });

  data
    ? setdData([...data, contractAddress, usdDecimals])
    : setdData(null as any);
  const tokenAmount = data
    ? Number(formatUnits(data[1], token?.decimals)).toFixed(10)
    : "loading..";
  const usdAmount = data
    ? Number(formatUnits(data[2], usdDecimals)).toFixed(2) + "$"
    : "loading..";

  return (
    <div
      style={{
        paddingTop: "15px",
      }}
    >
      <div
        className="input"
        style={{
          backgroundColor: `#${sibg} !important`,
          color: `#${sic}`,
        }}
      >
        {tokenAmount}
      </div>
      <div>{usdAmount}</div>
    </div>
  );
}
