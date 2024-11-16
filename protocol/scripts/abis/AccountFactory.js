const AF_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "createAccount",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "getAddress",
    outputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

module.exports = {
  AF_ABI,
};
