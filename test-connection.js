const { ethers } = require("ethers");

// --- IMPORTANT: UPDATE THESE TWO VALUES ---

// 1. Paste the new contract address from your deployment terminal here
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// 2. Paste the ABI from artifacts/contracts/LandRegistry.sol/LandRegistry.json here
const contractABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "transactionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "approver",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "enum LandRegistry.ApprovalStatus",
          "name": "status",
          "type": "uint8"
        }
      ],
      "name": "ApprovalReceived",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "LandRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "transactionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "landId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "LandTransferInitiated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "transactionId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "landId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "LandTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "registrationId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "RegistrationApproved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "registrationId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "prospectiveOwner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        }
      ],
      "name": "RegistrationInitiated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "registrationId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "RegistrationRejected",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "registrationId",
          "type": "uint256"
        }
      ],
      "name": "RegistrationResubmitted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "UserVerified",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "VerificationApproved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "VerificationRejected",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "documentIpfsHash",
          "type": "string"
        }
      ],
      "name": "VerificationSubmitted",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "COMMISSIONER_OF_LAND",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "KITWE_CITY_COUNCIL",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "LANDS_DEEDS_REGISTRY",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "TREASURY",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_registrationId",
          "type": "uint256"
        }
      ],
      "name": "approveRegistration",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_transactionId",
          "type": "uint256"
        }
      ],
      "name": "approveTransfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_userAddress",
          "type": "address"
        }
      ],
      "name": "approveVerification",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getLand",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "location",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "ipfsHash",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct LandRegistry.Land",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getPendingVerificationAddresses",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_registrationId",
          "type": "uint256"
        }
      ],
      "name": "getRegistrationApprovals",
      "outputs": [
        {
          "internalType": "enum LandRegistry.ApprovalStatus",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "enum LandRegistry.ApprovalStatus",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "enum LandRegistry.ApprovalStatus",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "enum LandRegistry.ApprovalStatus",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_transactionId",
          "type": "uint256"
        }
      ],
      "name": "getTransactionApprovals",
      "outputs": [
        {
          "internalType": "enum LandRegistry.ApprovalStatus",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "enum LandRegistry.ApprovalStatus",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "enum LandRegistry.ApprovalStatus",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "enum LandRegistry.ApprovalStatus",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_userAddress",
          "type": "address"
        }
      ],
      "name": "getVerificationApprovals",
      "outputs": [
        {
          "internalType": "enum LandRegistry.ApprovalStatus",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "enum LandRegistry.ApprovalStatus",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "enum LandRegistry.ApprovalStatus",
          "name": "",
          "type": "uint8"
        },
        {
          "internalType": "enum LandRegistry.ApprovalStatus",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_location",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "initiateRegistration",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_landId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "_newOwner",
          "type": "address"
        }
      ],
      "name": "initiateTransfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "isAuthority",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "landCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "lands",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "locationExists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "pendingVerificationAddresses",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "registrationCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "registrations",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "prospectiveOwner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "location",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "executed",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isRejected",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "rejectionTimestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_registrationId",
          "type": "uint256"
        }
      ],
      "name": "rejectRegistration",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_transactionId",
          "type": "uint256"
        }
      ],
      "name": "rejectTransfer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_userAddress",
          "type": "address"
        }
      ],
      "name": "rejectVerification",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_registrationId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_newLocation",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_newIpfsHash",
          "type": "string"
        }
      ],
      "name": "resubmitRegistration",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_documentIpfsHash",
          "type": "string"
        }
      ],
      "name": "submitVerification",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "transactionCounter",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "transactions",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "landId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "initiator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "executed",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "verifications",
      "outputs": [
        {
          "internalType": "string",
          "name": "documentIpfsHash",
          "type": "string"
        },
        {
          "internalType": "enum LandRegistry.UserStatus",
          "name": "status",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

// --- END OF VALUES TO UPDATE ---


async function main() {
  // Connect to the running Hardhat node
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

  // Create an instance of your contract
  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  console.log(`Attempting to connect to contract at: ${contractAddress}`);

  try {
    // Call the simplest possible function on your contract: landCounter()
    // This function takes no arguments and returns a number, making it a perfect test.
    const landCount = await contract.landCounter();

    // The 'result' we get back is a BigInt, so we convert it to a string to display it.
    console.log("✅ SUCCESS: Successfully connected to the contract.");
    console.log(`Current land count is: ${landCount.toString()}`);

  } catch (error) {
    console.error("❌ FAILURE: Could not connect to or interact with the contract.");
    console.error("This suggests a deep issue with the Hardhat node or the contract deployment.");
    console.error(error);
  }
}

main();
