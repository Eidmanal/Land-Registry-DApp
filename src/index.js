/***********************
 * Config
 ***********************/
// IMPORTANT: Make sure this address matches your deployed contract
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const contractABI = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "transactionId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "approver", "type": "address" }, { "indexed": false, "internalType": "enum LandRegistry.ApprovalStatus", "name": "status", "type": "uint8" } ], "name": "ApprovalReceived", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "authority", "type": "address" } ], "name": "AuthorityVerified", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "string", "name": "location", "type": "string" }, { "indexed": false, "internalType": "string", "name": "ipfsHash", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "name": "LandRegistered", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "transactionId", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "landId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "address", "name": "to", "type": "address" } ], "name": "LandTransferInitiated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "transactionId", "type": "uint256" }, { "indexed": true, "internalType": "uint256", "name": "landId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "address", "name": "to", "type": "address" } ], "name": "LandTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "registrationId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "approver", "type": "address" } ], "name": "RegistrationApproved", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "registrationId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "prospectiveOwner", "type": "address" }, { "indexed": false, "internalType": "string", "name": "location", "type": "string" }, { "indexed": false, "internalType": "string", "name": "ipfsHash", "type": "string" } ], "name": "RegistrationInitiated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "registrationId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "approver", "type": "address" } ], "name": "RegistrationRejected", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "registrationId", "type": "uint256" } ], "name": "RegistrationResubmitted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" } ], "name": "UserApproved", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" } ], "name": "UserRejected", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "string", "name": "nrc", "type": "string" } ], "name": "UserRequested", "type": "event" }, { "inputs": [], "name": "COMMISSIONER_OF_LAND", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "KITWE_CITY_COUNCIL", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "LANDS_DEEDS_REGISTRY", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "TREASURY", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_registrationId", "type": "uint256" } ], "name": "approveRegistration", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_transactionId", "type": "uint256" } ], "name": "approveTransfer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_user", "type": "address" } ], "name": "approveUser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "approvedUsers", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "authorities", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "commissioner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_id", "type": "uint256" } ], "name": "getLand", "outputs": [ { "components": [ { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "string", "name": "location", "type": "string" }, { "internalType": "string", "name": "ipfsHash", "type": "string" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "internalType": "struct LandRegistry.Land", "name": "", "type": "tuple" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "user", "type": "address" } ], "name": "getPendingUserNRC", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPendingUsers", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_registrationId", "type": "uint256" } ], "name": "getRegistration", "outputs": [ { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "prospectiveOwner", "type": "address" }, { "internalType": "string", "name": "location", "type": "string" }, { "internalType": "string", "name": "ipfsHash", "type": "string" }, { "internalType": "bool", "name": "executed", "type": "bool" }, { "internalType": "bool", "name": "isRejected", "type": "bool" }, { "internalType": "uint256", "name": "rejectionTimestamp", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_registrationId", "type": "uint256" } ], "name": "getRegistrationApprovals", "outputs": [ { "internalType": "enum LandRegistry.ApprovalStatus", "name": "", "type": "uint8" }, { "internalType": "enum LandRegistry.ApprovalStatus", "name": "", "type": "uint8" }, { "internalType": "enum LandRegistry.ApprovalStatus", "name": "", "type": "uint8" }, { "internalType": "enum LandRegistry.ApprovalStatus", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_transactionId", "type": "uint256" } ], "name": "getTransaction", "outputs": [ { "internalType": "uint256", "name": "landId", "type": "uint256" }, { "internalType": "address", "name": "newOwner", "type": "address" }, { "internalType": "address", "name": "initiator", "type": "address" }, { "internalType": "bool", "name": "executed", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_transactionId", "type": "uint256" } ], "name": "getTransactionApprovals", "outputs": [ { "internalType": "enum LandRegistry.ApprovalStatus", "name": "", "type": "uint8" }, { "internalType": "enum LandRegistry.ApprovalStatus", "name": "", "type": "uint8" }, { "internalType": "enum LandRegistry.ApprovalStatus", "name": "", "type": "uint8" }, { "internalType": "enum LandRegistry.ApprovalStatus", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_location", "type": "string" }, { "internalType": "string", "name": "_ipfsHash", "type": "string" } ], "name": "initiateRegistration", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_landId", "type": "uint256" }, { "internalType": "address", "name": "_newOwner", "type": "address" } ], "name": "initiateTransfer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "user", "type": "address" } ], "name": "isApproved", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_address", "type": "address" } ], "name": "isAuthority", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "landCounter", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "lands", "outputs": [ { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "string", "name": "location", "type": "string" }, { "internalType": "string", "name": "ipfsHash", "type": "string" }, { "internalType": "uint256", "name": "timestamp", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "locationExists", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "registrationCounter", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_registrationId", "type": "uint256" } ], "name": "rejectRegistration", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_transactionId", "type": "uint256" } ], "name": "rejectTransfer", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_user", "type": "address" } ], "name": "rejectUser", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_nrc", "type": "string" } ], "name": "requestApproval", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_registrationId", "type": "uint256" }, { "internalType": "string", "name": "_newLocation", "type": "string" }, { "internalType": "string", "name": "_newIpfsHash", "type": "string" } ], "name": "resubmitRegistration", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "transactionCounter", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ];

const AUTHORITIES = {
  KITWE_CITY_COUNCIL: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  COMMISSIONER_OF_LAND: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  LANDS_DEEDS_REGISTRY: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
  TREASURY: "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
};

let web3, contract, currentAccount;

/***********************
 * Application Startup
 ***********************/
window.addEventListener("DOMContentLoaded", init);

async function init() {
  // Setup listeners that only need to be set once
  document.getElementById("connectWalletBtn").addEventListener('click', connectWallet);
  setupFormEventListeners();

  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", () => window.location.reload());
    
    // Check if we're already connected from a previous session
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
      await handleConnection(accounts);
    }
  } else {
    showNotification("Please install MetaMask to use this DApp", "error");
  }
}

/***********************
 * Wallet Connection
 ***********************/
async function connectWallet() {
  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    await handleConnection(accounts);
  } catch (err) {
    console.error("Connection error:", err);
    showNotification(`Connection failed: ${err.message}`, "error");
  }
}

async function handleConnection(accounts) {
    currentAccount = accounts[0];
    contract = new web3.eth.Contract(contractABI, contractAddress);
    
    // This is the single point of truth for updating the UI after a connection
    await updateUIState();
}

function handleAccountsChanged(accounts) {
    if (accounts.length > 0) {
        // User switched to a new account
        handleConnection(accounts);
    } else {
        // User disconnected
        currentAccount = null;
        contract = null;
        updateUIState();
    }
}

/***********************
 * UI State Controller (The "Brain")
 ***********************/
async function updateUIState() {
    setConnectedUI(currentAccount);

    if (!currentAccount) {
        // If not connected, show the connect message and hide everything else.
        document.getElementById("dashboard").style.display = "none";
        document.getElementById("userRegistrationWrap").style.display = "none";
        document.getElementById("connectMessage").style.display = "flex";
        return;
    }

    // If we are connected, check the user's approval status
    try {
        const isApproved = await contract.methods.isApproved(currentAccount).call();
        
        if (isApproved) {
            // --- USER IS APPROVED ---
            document.getElementById("userRegistrationWrap").style.display = "none";
            document.getElementById("dashboard").style.display = "block";

            // Check for special roles
            const isCommissioner = await checkIsCommissioner();
            document.getElementById("commissionerPanel").style.display = isCommissioner ? "block" : "none";
            if (isCommissioner) {
              await loadPendingUsersForCommissioner();
              showSection('adminPanelContainer');
            }

            document.querySelectorAll(".admin-only").forEach(el => {
                el.style.display = isAuthority() ? "flex" : "none";
            });
            
            await loadData();
        } else {
            // --- USER IS NOT APPROVED ---
            document.getElementById("userRegistrationWrap").style.display = "block";
            document.getElementById("dashboard").style.display = "none";
        }
    } catch (e) {
        console.error("Critical Error in updateUIState:", e);
        showNotification("Could not check user status. Is your wallet connected to the correct network?", "error");
        // Hide everything as a safe fallback
        document.getElementById("dashboard").style.display = "none";
        document.getElementById("userRegistrationWrap").style.display = "none";
    }
}

function setConnectedUI(addr) {
  const addressEl = document.getElementById("userAddress");
  const connectMsg = document.getElementById("connectMessage");
  const connectBtn = document.getElementById("connectWalletBtn");

  if (addr) {
    addressEl.innerHTML = `<i class="fas fa-user-circle"></i> ${shortAddress(addr)}`;
    connectBtn.style.display = "none";
    addressEl.style.display = "flex";
    connectMsg.style.display = "none";
  } else {
    addressEl.innerHTML = '<i class="fas fa-user-circle"></i> Not connected';
    connectBtn.style.display = "flex";
    addressEl.style.display = "none";
    connectMsg.style.display = "flex";
  }
}

function showSection(idToShow) {
  const ids = ["landFormContainer", "transferFormContainer", "landsContainer", "historyContainer", "adminPanelContainer"];
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.style.display = id === idToShow ? "block" : "none";
  });

  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));
  const map = {
    landFormContainer: "showRegisterFormBtn",
    landsContainer: "showAllLandsBtn",
    historyContainer: "showHistoryBtn",
    adminPanelContainer: "showAdminPanelBtn",
  };
  const btn = document.getElementById(map[idToShow]);
  if (btn) btn.classList.add("active");
}

/***********************
 * Event Listeners (Setup Once)
 ***********************/
function setupFormEventListeners() {
  document.getElementById("showRegisterFormBtn").addEventListener("click", () => showSection("landFormContainer"));
  document.getElementById("showAllLandsBtn").addEventListener("click", () => showSection("landsContainer"));
  document.getElementById("showHistoryBtn").addEventListener("click", () => {
    showSection("historyContainer");
    displayHistory();
  });
  document.getElementById("showAdminPanelBtn").addEventListener("click", () => showSection("adminPanelContainer"));

  document.getElementById("landForm").addEventListener("submit", handleRegistrationSubmit);
  document.getElementById("transferForm").addEventListener("submit", handleTransferSubmit);
  document.getElementById("resubmitForm").addEventListener("submit", handleResubmission);
  document.getElementById("userRegistrationForm").addEventListener("submit", requestAccountApproval);
}

/***********************
 * User & Commissioner Actions
 ***********************/
async function requestAccountApproval(e) {
  e.preventDefault();
  const nrc = document.getElementById("nrcInput").value.trim();
  if (!nrc) return showNotification("Please enter your NRC.", "error");

  await performTransaction(
    () => contract.methods.requestApproval(nrc).send({ from: currentAccount }),
    "Account request submitted. Await commissioner approval.",
    "Account request failed."
  );
  e.target.reset();
}

async function approveUser(userAddress) {
  if (!await checkIsCommissioner()) return showNotification("Only the commissioner can approve users.", "error");

  await performTransaction(
      () => contract.methods.approveUser(userAddress).send({ from: currentAccount }),
      `User ${shortAddress(userAddress)} approved successfully!`,
      "User approval failed."
  );
}

async function rejectUser(userAddress) {
    if (!await checkIsCommissioner()) return showNotification("Only the commissioner can reject users.", "error");
    
    await performTransaction(
      () => contract.methods.rejectUser(userAddress).send({ from: currentAccount }),
      "User rejected.",
      "Rejection failed."
    );
}

async function loadPendingUsersForCommissioner() {
  const container = document.getElementById("pendingUsersContainer");
  container.innerHTML = '<div class="loading">Loading...</div>';
  try {
    const users = await contract.methods.getPendingUsers().call();
    if (users.length === 0) {
        container.innerHTML = '<div class="no-data">No pending user requests.</div>';
        return;
    }
    let html = "";
    for (const user of users) {
      const nrc = await contract.methods.getPendingUserNRC(user).call();
      html += `
        <div class="request-card">
          <p><strong>${shortAddress(user)}</strong> · <small>${user}</small><br><small>NRC: ${nrc || 'N/A'}</small></p>
          <div class="transaction-actions">
            <button class="action-btn approve-btn" onclick="approveUser('${user}')"><i class="fas fa-check"></i> Approve</button>
            <button class="action-btn reject-btn" onclick="rejectUser('${user}')"><i class="fas fa-times"></i> Reject</button>
          </div>
        </div>`;
    }
    container.innerHTML = html;
  } catch (err) {
    console.error("loadPendingUsersForCommissioner failed", err);
    container.innerHTML = '<div class="error">Could not load pending users.</div>';
  }
}

/***********************
 * Land Actions
 ***********************/
async function handleRegistrationSubmit(e) {
  e.preventDefault();
  const location = document.getElementById("landLocation").value.trim();
  const ipfsHash = document.getElementById("landIpfsHash").value.trim();
  if (!location || !ipfsHash) return;

  await performTransaction(
    () => contract.methods.initiateRegistration(location, ipfsHash).send({ from: currentAccount }),
    "Registration initiated. Awaiting approvals.",
    "Registration failed."
  );
  e.target.reset();
}

async function handleTransferSubmit(e) {
  e.preventDefault();
  const landId = document.getElementById("transferLandId").value.trim();
  const newOwner = document.getElementById("newOwnerAddress").value.trim();
  if (!landId || !newOwner) return;

  await performTransaction(
    () => contract.methods.initiateTransfer(landId, newOwner).send({ from: currentAccount }),
    "Transfer initiated. Awaiting approvals.",
    "Transfer initiation failed."
  );
  e.target.reset();
}

async function handleResubmission(e) {
  e.preventDefault();
  const regId = document.getElementById("resubmitRegId").value;
  const newLoc = document.getElementById("newLandLocation").value.trim();
  const newHash = document.getElementById("newLandIpfsHash").value.trim();
  if (!regId || !newLoc || !newHash) return;

  await performTransaction(
    () => contract.methods.resubmitRegistration(regId, newLoc, newHash).send({ from: currentAccount }),
    "Application resubmitted successfully!",
    "Resubmission failed."
  );
  closeResubmitModal();
}

/***********************
 * Data Loading & Display
 ***********************/
async function loadData() {
    if (!contract) return;
    try {
      await Promise.all([displayAllLands(), displayPendingTransfers(), displayRegistrationRequests()]);
    } catch (e) {
      console.error("Error loading data:", e);
    }
}

async function displayAllLands() {
  const list = document.getElementById("landsList");
  list.innerHTML = '<div class="loading">Loading land records...</div>';
  try {
    const total = await contract.methods.landCounter().call();
    if (parseInt(total) === 0) return list.innerHTML = '<div class="no-data">No land records found.</div>';

    let html = "";
    for (let id = 1; id <= total; id++) {
      const land = await contract.methods.lands(id).call();
      if (land.owner !== "0x0000000000000000000000000000000000000000") {
        html += renderLandCard(land);
      }
    }
    list.innerHTML = html || '<div class="no-data">No land records found.</div>';
  } catch (err) {
      console.error("displayAllLands error:", err);
      list.innerHTML = '<div class="error">Could not load land records.</div>';
  }
}

async function displayPendingTransfers() {
  const container = document.getElementById("approvalsContainer");
  container.innerHTML = '<div class="loading">Loading transfer requests...</div>';
  try {
    const total = await contract.methods.transactionCounter().call();
    let html = "";
    let count = 0;
    for (let id = 1; id <= total; id++) {
      const tx = await contract.methods.getTransaction(id).call();
      if (!tx.executed) {
        const approvals = await contract.methods.getTransactionApprovals(id).call();
        html += renderTransferRequest(tx, approvals, id);
        count++;
      }
    }
    container.innerHTML = count > 0 ? html : '<div class="no-data">No pending transfer requests.</div>';
  } catch(err) {
      console.error("displayPendingTransfers error:", err);
      container.innerHTML = '<div class="error">Could not load transfer requests.</div>';
  }
}

async function displayRegistrationRequests() {
  const pendingContainer = document.getElementById("registrationRequestsContainer");
  const rejectedContainer = document.getElementById("rejectedRequestsContainer");
  pendingContainer.innerHTML = '<div class="loading">Loading requests...</div>';
  rejectedContainer.innerHTML = '<div class="loading">Loading requests...</div>';
  try {
    const total = await contract.methods.registrationCounter().call();
    let pendingHtml = "", finalRejectedHtml = "", pendingCount = 0, finalRejectedCount = 0;
    const now = Math.floor(Date.now() / 1000);

    for (let id = 1; id <= total; id++) {
      const r = await contract.methods.getRegistration(id).call();
      if (r.executed) continue;
      const approvals = await contract.methods.getRegistrationApprovals(id).call();
      
      if (r.isRejected) {
        const deadline = parseInt(r.rejectionTimestamp) + 3 * 24 * 60 * 60;
        if (now < deadline) {
          pendingHtml += renderRegistrationRequest(r, approvals, "rejected", id);
          pendingCount++;
        } else {
          finalRejectedHtml += renderRegistrationRequest(r, approvals, "final-rejection", id);
          finalRejectedCount++;
        }
      } else {
        pendingHtml += renderRegistrationRequest(r, approvals, "pending", id);
        pendingCount++;
      }
    }
    pendingContainer.innerHTML = pendingCount > 0 ? pendingHtml : '<div class="no-data">No pending requests.</div>';
    rejectedContainer.innerHTML = finalRejectedCount > 0 ? finalRejectedHtml : '<div class="no-data">No finally rejected applications.</div>';
  } catch(err) {
      console.error("displayRegistrationRequests error:", err);
      pendingContainer.innerHTML = '<div class="error">Could not load registration requests.</div>';
  }
}

async function displayHistory() {
  const regEl = document.getElementById("registrationHistoryContainer");
  const txEl = document.getElementById("transferHistoryContainer");
  regEl.innerHTML = '<div class="loading">Loading...</div>';
  txEl.innerHTML = '<div class="loading">Loading...</div>';
  try {
    const regs = await contract.getPastEvents("LandRegistered", { fromBlock: 0, toBlock: 'latest' });
    regEl.innerHTML = regs.length > 0 ? regs.reverse().map(ev => renderHistoryCard("Land Registered", `ID: ${ev.returnValues.id}`, `Owner: ${shortAddress(ev.returnValues.owner)}`, ev.returnValues.timestamp)).join("") : '<div class="no-data">No registration history.</div>';
    
    const transfers = await contract.getPastEvents("LandTransferred", { fromBlock: 0, toBlock: 'latest' });
    txEl.innerHTML = transfers.length > 0 ? transfers.reverse().map(ev => renderHistoryCard("Land Transferred", `Land ID: ${ev.returnValues.landId}`, `From: ${shortAddress(ev.returnValues.from)}<br>To: ${shortAddress(ev.returnValues.to)}`)).join("") : '<div class="no-data">No transfer history.</div>';
  } catch (err) {
    console.error("Error fetching history:", err);
    regEl.innerHTML = '<div class="error">Could not load history.</div>';
    txEl.innerHTML = '<div class="error">Could not load history.</div>';
  }
}

/***********************
 * Authority Actions
 ***********************/
function approveRegistration(id) {
  performTransaction(() => contract.methods.approveRegistration(id).send({ from: currentAccount }), "Approval successful.", "Approval failed.");
}
function rejectRegistration(id) {
  performTransaction(() => contract.methods.rejectRegistration(id).send({ from: currentAccount }), "Rejection successful.", "Rejection failed.");
}
function approveTransfer(id) {
  performTransaction(() => contract.methods.approveTransfer(id).send({ from: currentAccount }), "Approval successful.", "Approval failed.");
}
function rejectTransfer(id) {
  performTransaction(() => contract.methods.rejectTransfer(id).send({ from: currentAccount }), "Rejection successful.", "Rejection failed.");
}

/***********************
 * UI Render Helpers
 ***********************/
function renderLandCard(land) {
  const mine = land.owner.toLowerCase() === currentAccount.toLowerCase();
  return `
    <div class="land-card">
      <h3>Land ID: ${land.id}</h3>
      <p><strong>Owner:</strong> ${mine ? "You" : shortAddress(land.owner)}</p>
      <p><strong>Location:</strong> ${land.location}</p>
      <p><strong>Registered:</strong> ${new Date(parseInt(land.timestamp) * 1000).toLocaleString()}</p>
      ${mine ? `<button class="action-btn" onclick="initiateTransferForm(${land.id})">Transfer</button>` : ""}
    </div>`;
}

function renderTransferRequest(tx, approvals, id) {
  const pending = getPendingApprovals(approvals);
  return `
    <div class="transaction-card">
      <h3>Transfer Request #${id}</h3>
      <p><strong>Land ID:</strong> ${tx.landId}</p>
      <p><strong>From:</strong> ${shortAddress(tx.initiator)}</p>
      <p><strong>To:</strong> ${shortAddress(tx.newOwner)}</p>
      <div class="pending-approvals">
        <h5>Awaiting Approval From:</h5>
        <ul>${pending.map((p) => `<li><i class="fas fa-gavel"></i> ${p}</li>`).join("")}</ul>
      </div>
      ${isAuthority() ? `<div class="transaction-actions">
           <button class="action-btn approve-btn" onclick="approveTransfer(${id})"><i class="fas fa-check"></i> Approve</button>
           <button class="action-btn reject-btn" onclick="rejectTransfer(${id})"><i class="fas fa-times"></i> Reject</button>
         </div>` : ""}
    </div>`;
}

function renderRegistrationRequest(r, approvals, state, id) {
  let html = `<div class="request-card ${state === "rejected" ? "rejected" : ""}">
    <h3>Registration Request #${id}</h3>
    <p><strong>Applicant:</strong> ${shortAddress(r.prospectiveOwner)}</p>
    <p><strong>Location:</strong> ${r.location}</p>
    <p><a href="https://ipfs.io/ipfs/${r.ipfsHash}" target="_blank" rel="noopener noreferrer">View Document</a></p>`;

  if (state === "pending") {
    const pending = getPendingApprovals(approvals);
    html += `<div class="pending-approvals"><h5>Awaiting Approval From:</h5><ul>${pending.map((p) => `<li><i class="fas fa-gavel"></i> ${p}</li>`).join("")}</ul></div>`;
  } else if (state === "rejected") {
    const deadline = parseInt(r.rejectionTimestamp) + 3 * 24 * 60 * 60;
    html += `<div class="rejection-info"><h5>Application Rejected</h5><p>Resubmit before:<br><strong>${new Date(deadline * 1000).toLocaleString()}</strong></p></div>`;
  } else if (state === "final-rejection") {
    html += `<div class="rejection-info"><h5>Finally Rejected</h5><p>Did not approve: ${getNonApprovers(approvals).join(", ")}</p></div>`;
  }

  if (state === "pending" && isAuthority()) {
    html += `<div class="transaction-actions">
      <button class="action-btn approve-btn" onclick="approveRegistration(${id})"><i class="fas fa-check"></i> Approve</button>
      <button class="action-btn reject-btn" onclick="rejectRegistration(${id})"><i class="fas fa-times"></i> Reject</button>
    </div>`;
  }
  if (state === "rejected" && r.prospectiveOwner.toLowerCase() === currentAccount.toLowerCase()) {
    html += `<div class="transaction-actions"><button class="action-btn" onclick="openResubmitModal(${id})"><i class="fas fa-edit"></i> Resubmit</button></div>`;
  }
  html += `</div>`;
  return html;
}

function renderHistoryCard(title, line1, line2, ts) {
  return `
    <div class="history-card">
      <p><strong>${title}</strong></p>
      <p>${line1}</p>
      <p>${line2}</p>
      ${ts ? `<p class="timestamp">${new Date(parseInt(ts) * 1000).toLocaleString()}</p>` : ""}
    </div>`;
}

/***********************
 * Helpers & Utilities
 ***********************/
function shortAddress(a) { return a ? `${a.slice(0, 6)}...${a.slice(-4)}` : ""; }
function isAuthority() { return Object.values(AUTHORITIES).some((addr) => addr.toLowerCase() === currentAccount?.toLowerCase()); }
async function checkIsCommissioner() {
    if (!contract || !currentAccount) return false;
    const commissionerAddress = await contract.methods.commissioner().call();
    return currentAccount.toLowerCase() === commissionerAddress.toLowerCase();
}

function getPendingApprovals(arr) {
  const out = [];
  if (parseInt(arr[0]) === 0) out.push("Kitwe City Council");
  if (parseInt(arr[1]) === 0) out.push("Commissioner of Land");
  if (parseInt(arr[2]) === 0) out.push("Lands and Deeds Registry");
  if (parseInt(arr[3]) === 0) out.push("Treasury");
  return out;
}
function getNonApprovers(arr) {
  const out = [];
  if (parseInt(arr[0]) !== 1) out.push("Kitwe City Council");
  if (parseInt(arr[1]) !== 1) out.push("Commissioner of Land");
  if (parseInt(arr[2]) !== 1) out.push("Lands and Deeds Registry");
  if (parseInt(arr[3]) !== 1) out.push("Treasury");
  return out;
}

function showNotification(msg, type = "info", ms = 5000) {
  const n = document.getElementById("notification");
  n.textContent = msg;
  n.className = `notification show ${type}`;
  setTimeout(() => n.classList.remove("show"), ms);
}

async function performTransaction(actionFn, successMsg, failMsg) {
  showNotification("Processing transaction...", "info");
  try {
    await actionFn();
    showNotification(successMsg, "success");
    await updateUIState(); 
  } catch (err) {
    console.error(failMsg, err);
    const reasonMatch = /reason":"(.*?)"/.exec(err.message || "");
    const displayError = reasonMatch ? reasonMatch[1] : err.message;
    showNotification(`${failMsg}: ${displayError}`, "error");
  }
}

function initiateTransferForm(landId) {
    document.getElementById('transferLandId').value = landId;
    showSection('transferFormContainer');
}
function openResubmitModal(regId) {
    document.getElementById('resubmitRegId').value = regId;
    document.getElementById('resubmitModal').style.display = 'flex';
}
function closeResubmitModal() {
    document.getElementById('resubmitModal').style.display = 'none';
}

/***********************
 * Expose handlers for onclick
 ***********************/
window.approveUser = approveUser;
window.rejectUser = rejectUser;
window.approveRegistration = approveRegistration;
window.rejectRegistration = rejectRegistration;
window.approveTransfer = approveTransfer;
window.rejectTransfer = rejectTransfer;
window.openResubmitModal = openResubmitModal;
window.closeResubmitModal = closeResubmitModal;
window.initiateTransferForm = initiateTransferForm;
