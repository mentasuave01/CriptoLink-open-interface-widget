// import { erc20ABI } from "wagmi";
"use client";
const W2WABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "error",
        type: "string",
      },
    ],
    name: "ErrorLog",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "bridge",
        type: "address",
      },
    ],
    name: "UpdateBridge",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "UpdateRouter",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "ALL_ENDPOINTS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "BRIDGE",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "INIT",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAPER",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ROUTER",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WETH",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenOut",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_paperIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_transactionFee",
        type: "uint256",
      },
    ],
    name: "getDestinationViewData",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountInInStable",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutInToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutInStable",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_transactionFeeInStable",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_destPath",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_tokenOut",
        type: "address",
      },
    ],
    name: "getIntraChainViewData",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountInInStable",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutInToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutInStable",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_path",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "getSourceViewData",
    outputs: [
      {
        internalType: "uint256",
        name: "_amountInInStable",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutInPaper",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountOutInStable",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_sourceFeeInPaper",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_sourceFeeInStable",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "_enabledChains",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_minPaperForChain",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_minStableForChain",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "_sourcePath",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tokenIn",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenOut",
        type: "address",
      },
    ],
    name: "getSwapPath",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_bridge",
        type: "address",
      },
      {
        internalType: "address",
        name: "_paper",
        type: "address",
      },
      {
        internalType: "address",
        name: "_weth",
        type: "address",
      },
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_packageData",
        type: "bytes",
      },
    ],
    name: "messageProcess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_chain",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountIn",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_tokenOut",
        type: "address",
      },
      {
        internalType: "address",
        name: "_source",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "swap",
    outputs: [
      {
        internalType: "uint256",
        name: "_txId",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_bridge",
        type: "address",
      },
    ],
    name: "updateBridge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_chain",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "_contract",
        type: "address[]",
      },
    ],
    name: "updateEndpoint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_token",
        type: "address[]",
      },
      {
        internalType: "bool[]",
        name: "_status",
        type: "bool[]",
      },
    ],
    name: "updatePaperPair",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
    ],
    name: "updateRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const BridgeABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_chain",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "watcher",
        type: "address",
      },
    ],
    name: "AddWatcher",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "txId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "ErrorLog",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
    ],
    name: "Recover",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "watcher",
        type: "address",
      },
    ],
    name: "RemoveWatcher",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "watcher",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "pausedUntil",
        type: "uint256",
      },
    ],
    name: "SecurityPause",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "SecurityUnpause",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "txId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "SendProcessed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "txId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "chain",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "source",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "SendRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "accountant",
        type: "address",
      },
    ],
    name: "SetAccountant",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "bridgeFeePct",
        type: "uint256",
      },
    ],
    name: "SetBridgeFeePct",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "SetBridgeOperator",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "SetBridgeStatus",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "cccnft",
        type: "address",
      },
    ],
    name: "SetCCCNFT",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "chain",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "status",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "minToken",
        type: "uint256",
      },
    ],
    name: "SetChainStatus",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "minFee",
        type: "uint256",
      },
    ],
    name: "SetMinFee",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "paper",
        type: "address",
      },
    ],
    name: "SetPaper",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "SetRouter",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "sourceFeePct",
        type: "uint256",
      },
    ],
    name: "SetSourceFeePct",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "stable",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stableDecimals",
        type: "uint256",
      },
    ],
    name: "SetStable",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "treasury",
        type: "address",
      },
    ],
    name: "SetTreasury",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "INIT",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PAUSED_UNTIL",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "WATCHERS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "WATCHER_STATUS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "accountant",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_watcher",
        type: "address",
      },
    ],
    name: "addWatcher",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "bridgeEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bridgeFeePct",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_txId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_gas",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "bridgeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "bridgeOperators",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cccnft",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "chain",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "enabledChains",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "failedTransfers",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amountInPaper",
        type: "uint256",
      },
    ],
    name: "getSourceFee",
    outputs: [
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_weth",
        type: "address",
      },
      {
        internalType: "address",
        name: "_paper",
        type: "address",
      },
      {
        internalType: "address",
        name: "_stable",
        type: "address",
      },
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
      {
        internalType: "address",
        name: "_accountant",
        type: "address",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "minFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "minTokenForChain",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextTxId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paper",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "processedTransfers",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
    ],
    name: "recover",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_watcher",
        type: "address",
      },
    ],
    name: "removeWatcher",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "router",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "securityPause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "securityUnpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_chain",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_source",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "sendRequest",
    outputs: [
      {
        internalType: "uint256",
        name: "_txId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_accountant",
        type: "address",
      },
    ],
    name: "setAccountant",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_bridgeFeePct",
        type: "uint256",
      },
    ],
    name: "setBridgeFeePct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "setBridgeOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "setBridgeStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_cccnft",
        type: "address",
      },
    ],
    name: "setCCCNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_chain",
        type: "uint256[]",
      },
      {
        internalType: "bool[]",
        name: "_status",
        type: "bool[]",
      },
      {
        internalType: "uint256[]",
        name: "_minToken",
        type: "uint256[]",
      },
    ],
    name: "setChainStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_paper",
        type: "address",
      },
    ],
    name: "setPaper",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
    ],
    name: "setRouter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_sourceFeePct",
        type: "uint256",
      },
    ],
    name: "setSourceFeePct",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_stable",
        type: "address",
      },
    ],
    name: "setStable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_treasury",
        type: "address",
      },
    ],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "sourceFeePct",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stable",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stableDecimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "treasury",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "weth",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

//BNB
export const BridgeBNB = {
  address: "0xB7BE2B47245c3e3Bc8Bb1A409A9058e6aee24372",
  abi: BridgeABI,
} as const;

export const W2W_BNB = {
  address: "0xC97Da86DaF7c017b2E961647767856644b4C28D6",
  abi: W2WABI,
} as const;

//POLY
export const BridgePOLY = {
  address: "0x5F337AE657997BA8E4E17A2C8a97819eAfd8B51C",
  abi: BridgeABI,
} as const;

export const W2W_POLY = {
  address: "0x35ED630A394A597F2dB04086edcb561056Ef61aA",
  abi: W2WABI,
} as const;
