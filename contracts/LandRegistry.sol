// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title LandRegistry
 * @dev Decentralized land registration and transfer system with:
 *  - multi-authority approvals for registrations and transfers
 *  - a commissioner-managed user approval flow (users request -> commissioner approves)
 *  - 3-day resubmission grace period after rejection
 *
 * Notes:
 *  - For production, replace hardcoded authority addresses with upgradeable/configurable addresses
 *    or use OpenZeppelin AccessControl.
 *  - mappings inside structs cannot be enumerated on-chain. Use explicit getters/events/off-chain indexing.
 */
contract LandRegistry {
    // --- Types ---
    enum ApprovalStatus { PENDING, APPROVED, REJECTED }

    struct Land {
        uint id;
        address owner;
        string location;
        string ipfsHash;
        uint timestamp;
    }

    struct Transaction {
        uint landId;
        address newOwner;
        address initiator;
        bool executed;
        mapping(address => ApprovalStatus) approvals;
    }

    struct Registration {
        uint id;
        address prospectiveOwner;
        string location;
        string ipfsHash;
        bool executed;
        bool isRejected;
        uint rejectionTimestamp;
        mapping(address => ApprovalStatus) approvals;
    }

    // --- Authorities (example addresses) ---
    address public constant KITWE_CITY_COUNCIL    = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
    address public constant COMMISSIONER_OF_LAND  = 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65;
    address public constant LANDS_DEEDS_REGISTRY  = 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc;
    address public constant TREASURY              = 0x976EA74026E726554dB657fA54763abd0C3a0aa9;

    // ... inside your contract, after the TREASURY address declaration
    address[4] public authorities = [
        KITWE_CITY_COUNCIL,
        COMMISSIONER_OF_LAND,
        LANDS_DEEDS_REGISTRY,
        TREASURY
    ];

    // --- Commissioner & user approval flow ---
    address public commissioner; // commissioner (deployer by default)

    struct PendingUser {
        string nrc;
        bool exists;
        uint idx; // index in pendingUserAddresses for O(1) removal
    }
    mapping(address => bool) public approvedUsers;
    mapping(address => PendingUser) private pendingUsers;
    address[] private pendingUserAddresses;

    // --- State ---
    mapping(uint => Land) public lands;
    mapping(uint => Transaction) private transactions;     // private because struct contains mapping
    mapping(uint => Registration) private registrations;   // private for same reason
    mapping(string => bool) public locationExists;         // prevents duplicate locations
    uint public landCounter;
    uint public transactionCounter;
    uint public registrationCounter;

    // --- Events ---
    event LandRegistered(uint indexed id, address indexed owner, string location, string ipfsHash, uint timestamp);
    event LandTransferInitiated(uint indexed transactionId, uint indexed landId, address from, address to);
    event ApprovalReceived(uint indexed transactionId, address approver, ApprovalStatus status);
    event LandTransferred(uint indexed transactionId, uint indexed landId, address from, address to);
    event AuthorityVerified(address authority);
    event RegistrationInitiated(uint indexed registrationId, address prospectiveOwner, string location, string ipfsHash);
    event RegistrationApproved(uint indexed registrationId, address approver);
    event RegistrationRejected(uint indexed registrationId, address approver);
    event RegistrationResubmitted(uint indexed registrationId);

    event UserRequested(address indexed user, string nrc);
    event UserApproved(address indexed user);
    event UserRejected(address indexed user);

    // --- Modifiers ---
    modifier onlyAuthority() {
        require(isAuthority(msg.sender), "Unauthorized: Only authorities");
        _;
    }

    modifier onlyCommissioner() {
        require(msg.sender == commissioner, "Only commissioner");
        _;
    }

    modifier onlyApprovedUser() {
        require(approvedUsers[msg.sender], "Not approved by commissioner");
        _;
    }

    modifier landExists(uint _landId) {
        require(_landId > 0 && _landId <= landCounter, "Land does not exist");
        require(lands[_landId].owner != address(0), "Land has been deleted");
        _;
    }

    // --- Constructor ---
    constructor() {
    commissioner = COMMISSIONER_OF_LAND;

    // Automatically approve all authorities on deployment
    for (uint i = 0; i < authorities.length; i++) {
        approvedUsers[authorities[i]] = true;
    }
}

    // --- Authority check ---
    function isAuthority(address _address) public pure returns (bool) {
        return (
            _address == KITWE_CITY_COUNCIL ||
            _address == COMMISSIONER_OF_LAND ||
            _address == LANDS_DEEDS_REGISTRY ||
            _address == TREASURY
        );
    }

    // --- User approval workflow ---
    function requestApproval(string calldata _nrc) external {
        require(!approvedUsers[msg.sender], "Already approved");
        require(!pendingUsers[msg.sender].exists, "Already requested");
        pendingUsers[msg.sender] = PendingUser({ nrc: _nrc, exists: true, idx: pendingUserAddresses.length });
        pendingUserAddresses.push(msg.sender);
        emit UserRequested(msg.sender, _nrc);
    }

    function approveUser(address _user) external onlyCommissioner {
        require(pendingUsers[_user].exists, "No request found");
        approvedUsers[_user] = true;
        _removePendingUser(_user);
        emit UserApproved(_user);
    }

    function rejectUser(address _user) external onlyCommissioner {
        require(pendingUsers[_user].exists, "No request found");
        _removePendingUser(_user);
        emit UserRejected(_user);
    }

    function _removePendingUser(address _user) internal {
        PendingUser storage p = pendingUsers[_user];
        if (!p.exists) return;
        uint i = p.idx;
        uint last = pendingUserAddresses.length - 1;
        if (i != last) {
            address lastAddr = pendingUserAddresses[last];
            pendingUserAddresses[i] = lastAddr;
            pendingUsers[lastAddr].idx = i;
        }
        pendingUserAddresses.pop();
        delete pendingUsers[_user];
    }

    /// @notice Returns all currently pending user addresses.
    function getPendingUsers() external view returns (address[] memory) {
        return pendingUserAddresses;
    }

    /// @notice Optional: returns NRC for a pending user (empty string if none)
    function getPendingUserNRC(address user) external view returns (string memory) {
        if (pendingUsers[user].exists) return pendingUsers[user].nrc;
        return "";
    }

    // --- Registration flow ---
    function initiateRegistration(string calldata _location, string calldata _ipfsHash) external onlyApprovedUser {
        require(bytes(_location).length > 0, "Location cannot be empty");
        require(bytes(_ipfsHash).length > 0, "IPFS hash cannot be empty");
        require(!locationExists[_location], "Location already registered");

        registrationCounter++;
        Registration storage r = registrations[registrationCounter];
        r.id = registrationCounter;
        r.prospectiveOwner = msg.sender;
        r.location = _location;
        r.ipfsHash = _ipfsHash;
        r.executed = false;
        r.isRejected = false;
        r.rejectionTimestamp = 0;

        r.approvals[KITWE_CITY_COUNCIL]   = ApprovalStatus.PENDING;
        r.approvals[COMMISSIONER_OF_LAND] = ApprovalStatus.PENDING;
        r.approvals[LANDS_DEEDS_REGISTRY] = ApprovalStatus.PENDING;
        r.approvals[TREASURY]             = ApprovalStatus.PENDING;

        emit RegistrationInitiated(registrationCounter, msg.sender, _location, _ipfsHash);
    }

    function approveRegistration(uint _registrationId) public onlyAuthority {
        require(_registrationId > 0 && _registrationId <= registrationCounter, "Invalid registration ID");
        Registration storage r = registrations[_registrationId];
        require(!r.executed, "Registration executed");
        require(r.approvals[msg.sender] == ApprovalStatus.PENDING, "Already voted");

        r.approvals[msg.sender] = ApprovalStatus.APPROVED;
        emit RegistrationApproved(_registrationId, msg.sender);

        if (hasAllRegistrationApprovals(_registrationId)) {
            _executeRegistration(_registrationId);
        }
    }

    function rejectRegistration(uint _registrationId) public onlyAuthority {
        require(_registrationId > 0 && _registrationId <= registrationCounter, "Invalid registration ID");
        Registration storage r = registrations[_registrationId];
        require(!r.executed, "Registration executed");
        require(r.approvals[msg.sender] == ApprovalStatus.PENDING, "Already voted");

        r.approvals[msg.sender] = ApprovalStatus.REJECTED;

    if (!r.isRejected) {
            r.isRejected = true;
            r.rejectionTimestamp = block.timestamp;
        }

        emit RegistrationRejected(_registrationId, msg.sender);
    }

    function resubmitRegistration(uint _registrationId, string calldata _newLocation, string calldata _newIpfsHash) external {
        require(_registrationId > 0 && _registrationId <= registrationCounter, "Invalid registration ID");
        Registration storage r = registrations[_registrationId];
        require(r.prospectiveOwner == msg.sender, "Only applicant");
        require(r.isRejected, "Not rejected");
        require(!r.executed, "Executed");
        require(block.timestamp < r.rejectionTimestamp + 3 days, "Resubmission expired");

        if (keccak256(bytes(r.location)) != keccak256(bytes(_newLocation))) {
            require(!locationExists[_newLocation], "New location taken");
        }

        r.location = _newLocation;
        r.ipfsHash = _newIpfsHash;

        r.isRejected = false;
        r.rejectionTimestamp = 0;
        r.approvals[KITWE_CITY_COUNCIL]   = ApprovalStatus.PENDING;
        r.approvals[COMMISSIONER_OF_LAND] = ApprovalStatus.PENDING;
        r.approvals[LANDS_DEEDS_REGISTRY] = ApprovalStatus.PENDING;
        r.approvals[TREASURY]             = ApprovalStatus.PENDING;

        emit RegistrationResubmitted(_registrationId);
    }

    function _executeRegistration(uint _registrationId) internal {
        Registration storage r = registrations[_registrationId];
        require(!r.executed, "Registration executed");

        landCounter++;
        lands[landCounter] = Land({
            id: landCounter,
            owner: r.prospectiveOwner,
            location: r.location,
            ipfsHash: r.ipfsHash,
            timestamp: block.timestamp
        });

        r.executed = true;
        locationExists[r.location] = true;

        emit LandRegistered(landCounter, r.prospectiveOwner, r.location, r.ipfsHash, block.timestamp);
    }

    function hasAllRegistrationApprovals(uint _registrationId) internal view returns (bool) {
        Registration storage r = registrations[_registrationId];
        return (
            r.approvals[KITWE_CITY_COUNCIL]   == ApprovalStatus.APPROVED &&
            r.approvals[COMMISSIONER_OF_LAND] == ApprovalStatus.APPROVED &&
            r.approvals[LANDS_DEEDS_REGISTRY] == ApprovalStatus.APPROVED &&
            r.approvals[TREASURY]             == ApprovalStatus.APPROVED
        );
    }

    // --- Transfer flow ---
    function initiateTransfer(uint _landId, address _newOwner) public landExists(_landId) {
        require(msg.sender == lands[_landId].owner, "Only owner");
        require(_newOwner != address(0), "Invalid recipient");
        require(_newOwner != msg.sender, "Cannot transfer to yourself");

        transactionCounter++;
        Transaction storage t = transactions[transactionCounter];
        t.landId = _landId;
        t.newOwner = _newOwner;
        t.initiator = msg.sender;
        t.executed = false;

        t.approvals[KITWE_CITY_COUNCIL]   = ApprovalStatus.PENDING;
        t.approvals[COMMISSIONER_OF_LAND] = ApprovalStatus.PENDING;
        t.approvals[LANDS_DEEDS_REGISTRY] = ApprovalStatus.PENDING;
        t.approvals[TREASURY]             = ApprovalStatus.PENDING;

        emit LandTransferInitiated(transactionCounter, _landId, msg.sender, _newOwner);
    }

    function approveTransfer(uint _transactionId) public onlyAuthority {
        require(_transactionId > 0 && _transactionId <= transactionCounter, "Invalid transaction ID");
        Transaction storage t = transactions[_transactionId];
        require(!t.executed, "Transaction executed");
        require(t.approvals[msg.sender] == ApprovalStatus.PENDING, "Already voted");

        t.approvals[msg.sender] = ApprovalStatus.APPROVED;
        emit ApprovalReceived(_transactionId, msg.sender, ApprovalStatus.APPROVED);

        if (hasAllTransferApprovals(_transactionId)) {
            _executeTransfer(_transactionId);
        }
    }

    function rejectTransfer(uint _transactionId) public onlyAuthority {
        require(_transactionId > 0 && _transactionId <= transactionCounter, "Invalid transaction ID");
        Transaction storage t = transactions[_transactionId];
        require(!t.executed, "Transaction executed");
        require(t.approvals[msg.sender] == ApprovalStatus.PENDING, "Already voted");

        t.approvals[msg.sender] = ApprovalStatus.REJECTED;
        emit ApprovalReceived(_transactionId, msg.sender, ApprovalStatus.REJECTED);
    }

    function hasAllTransferApprovals(uint _transactionId) internal view returns (bool) {
        Transaction storage t = transactions[_transactionId];
        return (
            t.approvals[KITWE_CITY_COUNCIL]   == ApprovalStatus.APPROVED &&
            t.approvals[COMMISSIONER_OF_LAND] == ApprovalStatus.APPROVED &&
            t.approvals[LANDS_DEEDS_REGISTRY] == ApprovalStatus.APPROVED &&
            t.approvals[TREASURY]             == ApprovalStatus.APPROVED
        );
    }

    function _executeTransfer(uint _transactionId) internal {
        Transaction storage t = transactions[_transactionId];
        require(!t.executed, "Transaction executed");

        Land storage land = lands[t.landId];
        address previousOwner = land.owner;
        land.owner = t.newOwner;
        t.executed = true;

        emit LandTransferred(_transactionId, t.landId, previousOwner, t.newOwner);
    }

    // --- View getters compatible with Web3.js ---

    /// @notice Returns the four authority votes for a transfer
    function getTransactionApprovals(uint _transactionId)
        external
        view
        returns (ApprovalStatus, ApprovalStatus, ApprovalStatus, ApprovalStatus)
    {
        require(_transactionId > 0 && _transactionId <= transactionCounter, "Invalid transaction ID");
        Transaction storage t = transactions[_transactionId];
        return (
            t.approvals[KITWE_CITY_COUNCIL],
            t.approvals[COMMISSIONER_OF_LAND],
            t.approvals[LANDS_DEEDS_REGISTRY],
            t.approvals[TREASURY]
        );
    }

    /// @notice Returns the four authority votes for a registration
    function getRegistrationApprovals(uint _registrationId)
        external
        view
        returns (ApprovalStatus, ApprovalStatus, ApprovalStatus, ApprovalStatus)
    {
        require(_registrationId > 0 && _registrationId <= registrationCounter, "Invalid registration ID");
        Registration storage r = registrations[_registrationId];
        return (
            r.approvals[KITWE_CITY_COUNCIL],
            r.approvals[COMMISSIONER_OF_LAND],
            r.approvals[LANDS_DEEDS_REGISTRY],
            r.approvals[TREASURY]
        );
    }

    /// @notice Returns a registration summary, since mappings block auto-getters
    function getRegistration(uint _registrationId)
        external
        view
        returns (
            uint id,
            address prospectiveOwner,
            string memory location,
            string memory ipfsHash,
            bool executed,
            bool isRejected,
            uint rejectionTimestamp
        )
    {
        require(_registrationId > 0 && _registrationId <= registrationCounter, "Invalid registration ID");
        Registration storage r = registrations[_registrationId];
        return (r.id, r.prospectiveOwner, r.location, r.ipfsHash, r.executed, r.isRejected, r.rejectionTimestamp);
    }

    /// @notice Returns a transfer summary, since mappings block auto-getters
    function getTransaction(uint _transactionId)
        external
        view
        returns (
            uint landId,
            address newOwner,
            address initiator,
            bool executed
        )
    {
        require(_transactionId > 0 && _transactionId <= transactionCounter, "Invalid transaction ID");
        Transaction storage t = transactions[_transactionId];
        return (t.landId, t.newOwner, t.initiator, t.executed);
    }

    /// Simple getter for land
    function getLand(uint _id) external view landExists(_id) returns (Land memory) {
        return lands[_id];
    }

    /// Convenience: mapping-style view for user approval (frontend already uses this)
    function isApproved(address user) external view returns (bool) {
        return approvedUsers[user];
    }
}
