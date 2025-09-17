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
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "deedHashExists",
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
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const backendUrl = "http://127.0.0.1:5000/process-deed";


// Authorities
const AUTHORITIES = {
  KITWE_CITY_COUNCIL: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  COMMISSIONER_OF_LAND: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  LANDS_DEEDS_REGISTRY: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
  TREASURY: "0x976EA74026E726554dB657fA54763abd0C3a0aa9"
};

// App State - Ethers.js version
let provider;
let signer;
let contract;
let currentAccount;
let userVerificationStatus;
let listenersAttached = false;

// --- REFACTORED INITIALIZATION LOGIC (Ethers.js) ---

async function connectAndInit() {
    if (!window.ethereum) {
        showNotification('Please install MetaMask to use this DApp', 'error');
        document.getElementById("connectMessage").innerHTML = '<i class="fas fa-exclamation-triangle"></i> MetaMask not detected.';
        return;
    }

    try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        
        if (!contractABI || contractABI.length === 0 || contractAddress === "YOUR_DEPLOYED_CONTRACT_ADDRESS") {
            throw new Error("Contract ABI or Address is not configured properly.");
        }
        
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        if (!listenersAttached) {
            window.ethereum.on('accountsChanged', handleAccountChange);
            window.ethereum.on('chainChanged', () => window.location.reload());
            listenersAttached = true;
        }
        
        handleAccountChange(accounts);

    } catch (error) {
        console.error("Wallet connection error:", error);
        if (error.code !== -32002) {
          showNotification(`Connection failed: ${error.message}`, 'error');
        }
    }
}

async function handleAccountChange(accounts) {
    if (accounts.length === 0) {
        currentAccount = null;
        setConnected(null);
        return;
    }
    const newAccount = accounts[0];
    if (currentAccount && currentAccount.toLowerCase() === newAccount.toLowerCase()) return;
    
    currentAccount = newAccount;
    // Re-initialize signer and contract with the new account
    signer = provider.getSigner(currentAccount);
    contract = new ethers.Contract(contractAddress, contractABI, signer);
    
    setConnected(currentAccount);
    await startApp();
}

async function startApp() {
    if (!currentAccount) return;
    
    document.getElementById("landsList").innerHTML = '';
    document.getElementById("userVerificationsContainer").innerHTML = '';
    
    await checkUserVerification();
    await loadData();
}

async function loadData() {
  if (!currentAccount) return;
  try {
    if (userVerificationStatus === 2 || isAuthority()) {
      await displayAllLands();
    }
    if (isAuthority()) {
      await Promise.all([
        displayPendingTransfers(),
        displayRegistrationRequests(),
        displayPendingVerifications()
      ]);
    }
  } catch (error) {
    console.error("Error loading data:", error);
    showNotification('Failed to load blockchain data.', 'error');
  }
}

// ----------------------------------------------------------------------------------
// --- UI & Event Listeners ---
// ----------------------------------------------------------------------------------

function setupEventListeners() {
    if (document.getElementById("showRegisterFormBtn").getAttribute('data-listener') !== 'true') {
        document.getElementById("showRegisterFormBtn").addEventListener('click', () => showSection('landFormContainer'));
        document.getElementById("showAllLandsBtn").addEventListener('click', () => showSection('landsContainer'));
        document.getElementById("showHistoryBtn").addEventListener('click', () => {
            showSection('historyContainer');
            displayHistory();
        });
        document.getElementById("showAdminPanelBtn").addEventListener('click', () => showSection('adminPanelContainer'));

        document.getElementById("landForm").addEventListener('submit', handleRegistrationSubmit);
        document.getElementById("transferForm").addEventListener('submit', handleTransferSubmit);
        document.getElementById("resubmitForm").addEventListener('submit', handleResubmission);
        
        document.getElementById("showRegisterFormBtn").setAttribute('data-listener', 'true');
    }
}

function setConnected(address) {
  const userAddressEl = document.getElementById("userAddress");
  const dashboardEl = document.getElementById("dashboard");
  const connectMsgEl = document.getElementById("connectMessage");

  if (address) {
    userAddressEl.innerHTML = `<i class="fas fa-user-circle"></i> ${shortAddress(address)}`;
    connectMsgEl.style.display = 'none';
    dashboardEl.style.display = 'block';
    document.querySelectorAll('.admin-only').forEach(el => el.style.display = isAuthority() ? 'flex' : 'none');
    setupEventListeners();
  } else {
    userAddressEl.innerHTML = '<i class="fas fa-user-circle"></i> Not connected';
    connectMsgEl.style.display = 'flex';
    dashboardEl.style.display = 'none';
  }
}

function showSection(sectionId) {
  const sections = ['landFormContainer', 'transferFormContainer', 'landsContainer', 'historyContainer', 'adminPanelContainer', 'verificationContainer'];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = (id === sectionId) ? 'block' : 'none';
  });

  const buttonMap = {
    'landFormContainer': 'showRegisterFormBtn',
    'landsContainer': 'showAllLandsBtn',
    'historyContainer': 'showHistoryBtn',
    'adminPanelContainer': 'showAdminPanelBtn'
  };
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  const activeButton = document.getElementById(buttonMap[sectionId]);
  if (activeButton) activeButton.classList.add('active');
}

// ----------------------------------------------------------------------------------
// --- User Verification (Ethers.js) ---
// ----------------------------------------------------------------------------------

async function checkUserVerification() {
  const verification = await contract.verifications(currentAccount);
  userVerificationStatus = verification.status;
  updateUIAfterVerificationCheck();
}

function updateUIAfterVerificationCheck() {
  const verificationContainer = document.getElementById('verificationContainer');
  const mainNav = document.getElementById('mainNav');
  const statusEl = document.getElementById('verificationStatus');
  const contentSections = document.querySelectorAll('.content-section > div');
  const registerBtn = document.getElementById('showRegisterFormBtn');
  const landsBtn = document.getElementById('showAllLandsBtn');
  mainNav.style.display = 'flex';
  let statusHTML = '';
  let containerHTML = '';
  contentSections.forEach(section => section.style.display = 'none');
  const isVerified = userVerificationStatus === 2;
  registerBtn.disabled = !isVerified;
  landsBtn.disabled = !isVerified;

  if (isVerified) {
    statusHTML = `<i class="fas fa-check-circle"></i> Verified`;
    verificationContainer.style.display = 'none';
    showSection('landFormContainer');
  } else {
    verificationContainer.style.display = 'block';
    document.getElementById('showHistoryBtn').classList.add('active');
    switch (userVerificationStatus) {
      case 0:
        statusHTML = `<i class="fas fa-times-circle"></i> Not Verified`;
        containerHTML = `<h2>...</h2><form id="verificationForm">...</form>`; // Form HTML unchanged
        break;
      case 1:
        statusHTML = `<i class="fas fa-hourglass-half"></i> Verification Pending`;
        containerHTML = `<div class="info-message">...</div>`; // Message HTML unchanged
        break;
      case 3:
        statusHTML = `<i class="fas fa-exclamation-triangle"></i> Verification Rejected`;
        containerHTML = `<div class="error-message">...</div><form id="verificationForm">...</form>`; // Form HTML unchanged
        break;
    }
     // Simplified for brevity - full HTML is the same as your original file
    if (userVerificationStatus === 0 || userVerificationStatus === 3) {
      containerHTML = `<h2><i class="fas fa-id-card"></i> Identity Verification Required</h2> <p>To register or view land deeds, you must first submit a verification document (e.g., NRC or Driver's License) for approval.</p> <form id="verificationForm" class="app-form"> <div class="form-group"> <label for="docIpfsHash"><i class="fas fa-file-alt"></i> Document IPFS Hash</label> <input type="text" id="docIpfsHash" placeholder="Enter IPFS hash of your document" required> <small class="form-hint">Upload your document to a service like Pinata (IPFS) and paste the CID here.</small> </div> <button type="submit" class="submit-btn"><i class="fas fa-upload"></i> Submit for Verification</button> </form>`;
    } else if (userVerificationStatus === 1) {
      containerHTML = `<div class="info-message"><i class="fas fa-info-circle"></i> Your identity verification is pending approval. You can view public history while you wait.</div>`;
    }
  }

  statusEl.innerHTML = statusHTML;
  verificationContainer.innerHTML = containerHTML;
  
  if (userVerificationStatus === 0 || userVerificationStatus === 3) {
    document.getElementById('verificationForm').addEventListener('submit', handleVerificationSubmit);
  }
}

// ----------------------------------------------------------------------------------
// --- Form Handlers & Transaction Wrappers (Ethers.js) ---
// ----------------------------------------------------------------------------------

async function handleVerificationSubmit(e) {
  e.preventDefault();
  const docHash = document.getElementById("docIpfsHash").value;
  await performTransaction(
    () => contract.submitVerification(docHash),
    "Verification submitted successfully! Please wait for approval.",
    "Verification submission failed."
  );
  await checkUserVerification();
}

async function handleRegistrationSubmit(e) {
    e.preventDefault();
    const location = document.getElementById("landLocation").value;
    const fileInput = document.getElementById("landDeedFile");
    const file = fileInput.files[0];

    if (!location || !file) {
        showNotification("Please provide a location and select a deed file.", "error");
        return;
    }
    showNotification("Processing title deed...", "info");
    try {
        const formData = new FormData();
        formData.append('deedFile', file);
        const response = await fetch(backendUrl, { method: 'POST', body: formData });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || 'Failed to get hash from server.');
        
        const deedHash = result.deedHash;
        showNotification(`Deed processed. Submitting to blockchain...`, "info");

        await performTransaction(
            () => contract.initiateRegistration(location, deedHash),
            "Registration initiated successfully. Awaiting approvals.",
            "Registration failed."
        );
        e.target.reset();
    } catch (error) {
        console.error("Registration process failed:", error);
        showNotification(`Error: ${error.message}`, "error");
    }
}

async function handleTransferSubmit(e) {
  e.preventDefault();
  const landId = document.getElementById("transferLandId").value;
  const newOwner = document.getElementById("newOwnerAddress").value;
  await performTransaction(
    () => contract.initiateTransfer(landId, newOwner),
    "Transfer initiated successfully. Awaiting approvals.",
    "Transfer initiation failed."
  );
  e.target.reset();
  showSection('landsContainer');
}

async function handleResubmission(e) {
  e.preventDefault();
  const regId = document.getElementById('resubmitRegId').value;
  const newLocation = document.getElementById('newLandLocation').value;
  const newIpfsHash = document.getElementById('newLandIpfsHash').value;
  await performTransaction(
    () => contract.resubmitRegistration(regId, newLocation, newIpfsHash),
    "Application resubmitted successfully!",
    "Resubmission failed."
  );
  closeResubmitModal();
}

async function performTransaction(transactionPromise, successMessage, errorMessage) {
  showNotification("Processing transaction... Please confirm in your wallet.", "info");
  try {
    const tx = await transactionPromise();
    await tx.wait(); // Ethers.js way to wait for mining
    showNotification(successMessage, "success");
    await loadData();
  } catch (err) {
    console.error(errorMessage, err);
    const reason = err.reason || err.data?.message || err.message;
    showNotification(`${errorMessage}: ${reason.replace('execution reverted: ', '')}`, "error");
  }
}

// ----------------------------------------------------------------------------------
// --- Display & Rendering Functions (Ethers.js) ---
// ----------------------------------------------------------------------------------

async function displayPendingVerifications() {
  const container = document.getElementById("userVerificationsContainer");
  container.innerHTML = '<div class="loading">...</div>';
  const addresses = await contract.getPendingVerificationAddresses();
  if (addresses.length === 0) {
    container.innerHTML = '<div class="no-data">No pending user verifications.</div>';
    return;
  }
  let html = '';
  for (const address of addresses) {
    const verification = await contract.verifications(address);
    if (verification.status === 1) { // PENDING
      html += renderUserVerificationRequest(address, verification);
    }
  }
  container.innerHTML = html || '<div class="no-data">No pending user verifications.</div>';
}

async function displayAllLands() {
  const container = document.getElementById("landsList");
  container.innerHTML = '<div class="loading">...</div>';
  const count = await contract.landCounter();
  if (count == 0) {
    container.innerHTML = '<div class="no-data">No land records found.</div>';
    return;
  }
  let html = '';
  for (let i = 1; i <= count; i++) {
    const land = await contract.lands(i);
    if (land.owner !== "0x0000000000000000000000000000000000000000") {
      html += renderLandCard(land);
    }
  }
  container.innerHTML = html || '<div class="no-data">No land records found.</div>';
}

async function displayPendingTransfers() {
  const container = document.getElementById("approvalsContainer");
  container.innerHTML = '<div class="loading">...</div>';
  const count = await contract.transactionCounter();
  let html = '';
  let transferCount = 0;
  for (let i = 1; i <= count; i++) {
    const tx = await contract.transactions(i);
    if (!tx.executed) {
      const approvals = await contract.getTransactionApprovals(i);
      html += renderTransferRequest(tx, approvals, i);
      transferCount++;
    }
  }
  container.innerHTML = transferCount > 0 ? html : '<div class="no-data">No pending transfer requests.</div>';
}

async function displayRegistrationRequests() {
  const pendingContainer = document.getElementById("registrationRequestsContainer");
  const rejectedContainer = document.getElementById("rejectedRequestsContainer");
  pendingContainer.innerHTML = '<div class="loading">...</div>';
  rejectedContainer.innerHTML = '<div class="loading">...</div>';
  const count = await contract.registrationCounter();
  let pendingHtml = '', rejectedHtml = '', pendingCount = 0, rejectedCount = 0;
  const gracePeriod = 3 * 24 * 60 * 60;

  for (let i = 1; i <= count; i++) {
    const reg = await contract.registrations(i);
    if (reg.executed) continue;
    const approvals = await contract.getRegistrationApprovals(i);

    if (reg.isRejected) {
      const deadline = Number(reg.rejectionTimestamp) + gracePeriod;
      if (Math.floor(Date.now() / 1000) < deadline) {
        pendingHtml += renderRegistrationRequest(reg, approvals, 'rejected', i);
        pendingCount++;
      } else {
        rejectedHtml += renderRegistrationRequest(reg, approvals, 'final-rejection', i);
        rejectedCount++;
      }
    } else {
      pendingHtml += renderRegistrationRequest(reg, approvals, 'pending', i);
      pendingCount++;
    }
  }
  pendingContainer.innerHTML = pendingCount > 0 ? pendingHtml : '<div class="no-data">...</div>';
  rejectedContainer.innerHTML = rejectedCount > 0 ? rejectedHtml : '<div class="no-data">...</div>';
}

async function displayHistory() {
  const regContainer = document.getElementById("registrationHistoryContainer");
  const transContainer = document.getElementById("transferHistoryContainer");
  regContainer.innerHTML = '<div class="loading">...</div>';
  transContainer.innerHTML = '<div class="loading">...</div>';
  try {
    const regFilter = contract.filters.LandRegistered();
    const regEvents = await contract.queryFilter(regFilter, 0, 'latest');
    regContainer.innerHTML = regEvents.length > 0
      ? regEvents.reverse().map(e => renderHistoryCard('Land Registered', `ID: ${e.args.id}`, `Owner: ${shortAddress(e.args.owner)}`, e.args.timestamp.toNumber())).join('')
      : '<div class="no-data">...</div>';

    const transFilter = contract.filters.LandTransferred();
    const transEvents = await contract.queryFilter(transFilter, 0, 'latest');
    transContainer.innerHTML = transEvents.length > 0
      ? transEvents.reverse().map(e => renderHistoryCard('Land Transferred', `Land ID: ${e.args.landId}`, `From: ${shortAddress(e.args.from)}<br>To: ${shortAddress(e.args.to)}`, null, `Tx ID: ${e.args.transactionId}`)).join('')
      : '<div class="no-data">...</div>';
  } catch (error) {
    console.error("Error fetching history:", error);
    regContainer.innerHTML = '<div class="error">...</div>';
    transContainer.innerHTML = '<div class="error">...</div>';
  }
}

// ----------------------------------------------------------------------------------
// --- HTML Card Rendering (Unchanged) ---
// ----------------------------------------------------------------------------------
function renderUserVerificationRequest(address, verification) { /* Unchanged */ 
  return `
        <div class="transaction-card">
            <h3>Verification for: ${shortAddress(address)}</h3>
            <p><strong>Document:</strong> <a href="https://ipfs.io/ipfs/${verification.documentIpfsHash}" target="_blank" rel="noopener noreferrer">View on IPFS</a></p>
            <div class="transaction-actions">
                <button class="action-btn approve-btn" onclick="approveUser('${address}')"><i class="fas fa-check"></i> Approve</button>
                <button class="action-btn reject-btn" onclick="rejectUser('${address}')"><i class="fas fa-times"></i> Reject</button>
            </div>
        </div>`;
}
function renderLandCard(land) { /* Unchanged */ 
    const isOwner = land.owner.toLowerCase() === currentAccount.toLowerCase();
    return `
        <div class="land-card">
          <h3>Land ID: ${land.id}</h3>
          <p><strong>Owner:</strong> ${isOwner ? 'You' : shortAddress(land.owner)}</p>
          <p><strong>Location:</strong> ${land.location}</p>
          <p><strong>Deeds Doc:</strong> <a href="https://ipfs.io/ipfs/${land.ipfsHash}" target="_blank">View on IPFS</a></p>
          <p><strong>Registered:</strong> ${new Date(land.timestamp * 1000).toLocaleString()}</p>
          ${isOwner ? `<button class="action-btn" onclick="initiateTransferForm(${land.id})">Transfer</button>` : ''}
        </div>`;
}
function renderTransferRequest(tx, approvals, id) { /* Unchanged */ 
    const pending = getPendingApprovals(approvals);
    return `
        <div class="transaction-card">
            <h3>Transfer Request #${id}</h3>
            <p><strong>Land ID:</strong> ${tx.landId}</p>
            <p><strong>From:</strong> ${shortAddress(tx.initiator)}</p>
            <p><strong>To:</strong> ${shortAddress(tx.newOwner)}</p>
            <div class="pending-approvals">
                <h5>Awaiting Approval From:</h5>
                <ul>${pending.map(name => `<li><i class="fas fa-gavel"></i> ${name}</li>`).join('')}</ul>
            </div>
            ${isAuthority() ? `<div class="transaction-actions">
                <button class="action-btn approve-btn" onclick="approveTransfer(${id})"><i class="fas fa-check"></i> Approve</button>
                <button class="action-btn reject-btn" onclick="rejectTransfer(${id})"><i class="fas fa-times"></i> Reject</button>
            </div>` : ''}
        </div>`;
}
function renderRegistrationRequest(reg, approvals, state, id) { /* Unchanged */ 
  let html = `<div class="request-card ${state === 'rejected' ? 'rejected' : ''}">
        <h3>Registration Request #${id}</h3>
        <p><strong>Applicant:</strong> ${shortAddress(reg.prospectiveOwner)}</p>
        <p><strong>Location:</strong> ${reg.location}</p>
        <p><strong>Deeds Doc:</strong> <a href="https://ipfs.io/ipfs/${reg.ipfsHash}" target="_blank">View on IPFS</a></p>`;

  if (state === 'pending') {
    const pending = getPendingApprovals(approvals);
    html += `<div class="pending-approvals"><h5>Awaiting Approval From:</h5><ul>${pending.map(name => `<li><i class="fas fa-gavel"></i> ${name}</li>`).join('')}</ul></div>`;
  } else if (state === 'rejected') {
    const gracePeriod = 3 * 24 * 60 * 60; // 3 days
    const deadline = new Date((Number(reg.rejectionTimestamp) + gracePeriod) * 1000);
    html += `<div class="rejection-info"><h5>Application Rejected</h5><p>This can be resubmitted before:<br><strong>${deadline.toLocaleString()}</strong></p></div>`;
  } else if (state === 'final-rejection') {
    html += `<div class="rejection-info"><h5>Finally Rejected</h5><p>Grace period expired. Did not receive full approval.</p></div>`;
  }

  if (state === 'pending' && isAuthority()) {
    html += `<div class="transaction-actions">
            <button class="action-btn approve-btn" onclick="approveRegistration(${id})"><i class="fas fa-check"></i> Approve</button>
            <button class="action-btn reject-btn" onclick="rejectRegistration(${id})"><i class="fas fa-times"></i> Reject</button>
        </div>`;
  }

  if (state === 'rejected' && reg.prospectiveOwner.toLowerCase() === currentAccount.toLowerCase()) {
    html += `<div class="transaction-actions">
            <button class="action-btn" onclick="openResubmitModal(${id}, '${reg.location}', '${reg.ipfsHash}')"><i class="fas fa-edit"></i> Resubmit</button>
        </div>`;
  }
  html += `</div>`;
  return html;
}
function renderHistoryCard(title, line1, line2, timestamp, footer) { /* Unchanged */ 
    return `
        <div class="history-card">
            <p><strong>${title}</strong></p>
            <p>${line1}</p><p>${line2}</p>
            ${timestamp ? `<p class="timestamp">${new Date(timestamp * 1000).toLocaleString()}</p>` : ''}
            ${footer ? `<p class="timestamp">${footer}</p>` : ''}
        </div>`;
}


// ----------------------------------------------------------------------------------
// --- Action Functions (called from HTML) (Ethers.js) ---
// ----------------------------------------------------------------------------------

function approveUser(address) { performTransaction(() => contract.approveVerification(address), "User approved successfully.", "User approval failed."); }
function rejectUser(address) { performTransaction(() => contract.rejectVerification(address), "User rejected successfully.", "User rejection failed."); }
function approveRegistration(id) { performTransaction(() => contract.approveRegistration(id), "Approval successful.", "Approval failed."); }
function rejectRegistration(id) { performTransaction(() => contract.rejectRegistration(id), "Rejection successful.", "Rejection failed."); }
function approveTransfer(id) { performTransaction(() => contract.approveTransfer(id), "Approval successful.", "Approval failed."); }
function rejectTransfer(id) { performTransaction(() => contract.rejectTransfer(id), "Rejection successful.", "Rejection failed."); }
function initiateTransferForm(landId) {
  document.getElementById('transferLandId').value = landId;
  showSection('transferFormContainer');
}

// ----------------------------------------------------------------------------------
// --- Utility & Modal Functions (Ethers.js) ---
// ----------------------------------------------------------------------------------

function openResubmitModal(regId, location, ipfsHash) { /* Unchanged */ 
  document.getElementById('resubmitRegId').value = regId;
  document.getElementById('newLandLocation').value = location;
  document.getElementById('newLandIpfsHash').value = ipfsHash;
  document.getElementById('resubmitModal').style.display = 'flex';
}
function closeResubmitModal() { document.getElementById('resubmitModal').style.display = 'none'; }
function shortAddress(addr) { return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : ''; }
function isAuthority() { return Object.values(AUTHORITIES).some(addr => addr.toLowerCase() === currentAccount.toLowerCase()); }

function getPendingApprovals(approvals) {
  const authorities = ["Kitwe City Council", "Commissioner of Land", "Lands and Deeds Registry", "Treasury"];
  const pending = [];
  for (let i = 0; i < authorities.length; i++) {
    if (approvals[i] === 0) { // PENDING
      pending.push(authorities[i]);
    }
  }
  return pending;
}

function showNotification(message, type = 'info', duration = 5000) { /* Unchanged */ 
  const el = document.getElementById("notification");
  el.textContent = message;
  el.className = `notification show ${type}`;
  setTimeout(() => el.classList.remove('show'), duration);
}

// ----------------------------------------------------------------------------------
// --- Make functions globally available for onclick handlers ---
// ----------------------------------------------------------------------------------
window.approveUser = approveUser;
window.rejectUser = rejectUser;
window.approveRegistration = approveRegistration;
window.rejectRegistration = rejectRegistration;
window.approveTransfer = approveTransfer;
window.rejectTransfer = rejectTransfer;
window.openResubmitModal = openResubmitModal;
window.closeResubmitModal = closeResubmitModal;
window.initiateTransferForm = initiateTransferForm;

// --- Start the App ---
window.addEventListener('DOMContentLoaded', connectAndInit);
