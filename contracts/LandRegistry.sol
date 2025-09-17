// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title LandRegistry
 * @dev A smart contract for a decentralized land registration and transfer system.
 * It requires user identity verification before transactions can be made.
 * It requires multiple authorities to approve both registrations and transfers.
 * Rejections for registrations enter a 3-day grace period for the applicant to resubmit.
 */
contract LandRegistry {
    // Defines the possible states of an approval vote.
    enum ApprovalStatus { PENDING, APPROVED, REJECTED }
    
    // Defines the possible states for user verification
    enum UserStatus { NOT_SUBMITTED, PENDING, VERIFIED, REJECTED }

    // Represents a registered piece of land.
    struct Land {
        uint id;
        address owner;
        string location;
        string ipfsHash; // Hash for deeds/documents
        uint timestamp;
    }

    // Represents a user's identity verification request
    struct Verification {
        string documentIpfsHash; // Hash for NRC/Driver's License
        UserStatus status;
        mapping(address => ApprovalStatus) approvals;
    }

    // Represents a request to transfer land ownership.
    struct Transaction {
        uint landId;
        address newOwner;
        address initiator;
        bool executed;
        mapping(address => ApprovalStatus) approvals;
    }

    // Represents a request to register a new piece of land.
    struct Registration {
        uint id;
        address prospectiveOwner;
        string location;
        string ipfsHash;
        bool executed;
        bool isRejected;          // Flag to signify a rejection has occurred
        uint rejectionTimestamp;  // Timestamp of the first rejection
        mapping(address => ApprovalStatus) approvals;
    }

    // --- Authorities ---
    address public constant KITWE_CITY_COUNCIL = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;
    address public constant COMMISSIONER_OF_LAND = 0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65;
    address public constant LANDS_DEEDS_REGISTRY = 0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc;
    address public constant TREASURY = 0x976EA74026E726554dB657fA54763abd0C3a0aa9;

    // --- State Variables ---
    mapping(uint => Land) public lands;
    mapping(uint => Transaction) public transactions;
    mapping(uint => Registration) public registrations;
    mapping(address => Verification) public verifications;
    address[] public pendingVerificationAddresses;
    mapping(string => bool) public locationExists; // Prevents duplicate locations
    uint public landCounter;
    uint public transactionCounter;
    uint public registrationCounter;

    // --- Events ---
    event LandRegistered(uint id, address owner, string location, string ipfsHash, uint timestamp);
    event LandTransferInitiated(uint transactionId, uint landId, address from, address to);
    event ApprovalReceived(uint transactionId, address approver, ApprovalStatus status);
    event LandTransferred(uint transactionId, uint landId, address from, address to);
    event RegistrationInitiated(uint registrationId, address prospectiveOwner, string location, string ipfsHash);
    event RegistrationApproved(uint registrationId, address approver);
    event RegistrationRejected(uint registrationId, address approver);
    event RegistrationResubmitted(uint registrationId);
    event VerificationSubmitted(address indexed user, string documentIpfsHash);
    event VerificationApproved(address indexed user, address indexed approver);
    event VerificationRejected(address indexed user, address indexed approver);
    event UserVerified(address indexed user);


    // --- Modifiers ---
    modifier onlyAuthority() {
        require(isAuthority(msg.sender), "Unauthorized: Only approved entities can perform this action");
        _;
    }

    modifier landExists(uint _landId) {
        require(_landId > 0 && _landId <= landCounter, "Land does not exist");
        require(lands[_landId].owner != address(0), "Land has been deleted");
        _;
    }

    modifier onlyVerifiedUser() {
        require(verifications[msg.sender].status == UserStatus.VERIFIED, "User is not verified");
        _;
    }


    // --- Functions ---

    /**
     * @dev Checks if a given address belongs to one of the authorities.
     */
    function isAuthority(address _address) public pure returns (bool) {
        return (_address == KITWE_CITY_COUNCIL ||
                _address == COMMISSIONER_OF_LAND ||
                _address == LANDS_DEEDS_REGISTRY ||
                _address == TREASURY);
    }

    // --- User Verification Functions ---

    /**
     * @dev Allows a user to submit their verification document (NRC/License).
     */
    function submitVerification(string memory _documentIpfsHash) public {
        require(bytes(_documentIpfsHash).length > 0, "Document IPFS hash cannot be empty");
        Verification storage v = verifications[msg.sender];
        require(v.status == UserStatus.NOT_SUBMITTED || v.status == UserStatus.REJECTED, "Cannot submit verification at this time");

        v.documentIpfsHash = _documentIpfsHash;
        v.status = UserStatus.PENDING;
        
        // Reset approvals
        v.approvals[KITWE_CITY_COUNCIL] = ApprovalStatus.PENDING;
        v.approvals[COMMISSIONER_OF_LAND] = ApprovalStatus.PENDING;
        v.approvals[LANDS_DEEDS_REGISTRY] = ApprovalStatus.PENDING;
        v.approvals[TREASURY] = ApprovalStatus.PENDING;
        
        // Add to pending list for easier front-end fetching
        pendingVerificationAddresses.push(msg.sender);

        emit VerificationSubmitted(msg.sender, _documentIpfsHash);
    }

    /**
     * @dev Allows an authority to approve a user's verification document.
     * If all authorities approve, the user becomes verified.
     */
    function approveVerification(address _userAddress) public onlyAuthority {
        Verification storage v = verifications[_userAddress];
        require(v.status == UserStatus.PENDING, "No pending verification for this user");
        require(v.approvals[msg.sender] == ApprovalStatus.PENDING, "Already voted for this user");

        v.approvals[msg.sender] = ApprovalStatus.APPROVED;
        emit VerificationApproved(_userAddress, msg.sender);

        if (hasAllVerificationApprovals(_userAddress)) {
            v.status = UserStatus.VERIFIED;
            // Remove from pending list (this is a simple implementation)
            // A more robust implementation might be needed for very large lists
            for (uint i = 0; i < pendingVerificationAddresses.length; i++) {
                if (pendingVerificationAddresses[i] == _userAddress) {
                    pendingVerificationAddresses[i] = pendingVerificationAddresses[pendingVerificationAddresses.length - 1];
                    pendingVerificationAddresses.pop();
                    break;
                }
            }
            emit UserVerified(_userAddress);
        }
    }

    /**
     * @dev Allows an authority to reject a user's verification document.
     */
    function rejectVerification(address _userAddress) public onlyAuthority {
        Verification storage v = verifications[_userAddress];
        require(v.status == UserStatus.PENDING, "No pending verification for this user");
        require(v.approvals[msg.sender] == ApprovalStatus.PENDING, "Already voted for this user");

        v.status = UserStatus.REJECTED; // One rejection is enough to reject the user
        emit VerificationRejected(_userAddress, msg.sender);
    }

    /**
     * @dev Internal function to check if a user has all approvals.
     */
    function hasAllVerificationApprovals(address _userAddress) internal view returns (bool) {
        Verification storage v = verifications[_userAddress];
        return (v.approvals[KITWE_CITY_COUNCIL] == ApprovalStatus.APPROVED &&
                v.approvals[COMMISSIONER_OF_LAND] == ApprovalStatus.APPROVED &&
                v.approvals[LANDS_DEEDS_REGISTRY] == ApprovalStatus.APPROVED &&
                v.approvals[TREASURY] == ApprovalStatus.APPROVED);
    }


    // --- Land Registration Functions (Modified) ---

    /**
     * @dev Initiates a new land registration request. Requires the user to be verified.
     * As an optional feature, the user can add deeds of land they already own here for approval.
     */
    function initiateRegistration(string memory _location, string memory _ipfsHash) public onlyVerifiedUser {
        require(bytes(_location).length > 0, "Location cannot be empty");
        require(bytes(_ipfsHash).length > 0, "IPFS hash for deeds cannot be empty");
        require(!locationExists[_location], "Location already registered");

        registrationCounter++;
        Registration storage r = registrations[registrationCounter];
        r.id = registrationCounter;
        r.prospectiveOwner = msg.sender;
        r.location = _location;
        r.ipfsHash = _ipfsHash;
        
        // Reset all approval statuses to PENDING
        r.approvals[KITWE_CITY_COUNCIL] = ApprovalStatus.PENDING;
        r.approvals[COMMISSIONER_OF_LAND] = ApprovalStatus.PENDING;
        r.approvals[LANDS_DEEDS_REGISTRY] = ApprovalStatus.PENDING;
        r.approvals[TREASURY] = ApprovalStatus.PENDING;

        emit RegistrationInitiated(registrationCounter, msg.sender, _location, _ipfsHash);
    }

    /**
     * @dev Allows an authority to approve a registration request.
     * If all authorities approve, the registration is executed.
     */
    function approveRegistration(uint _registrationId) public onlyAuthority {
        Registration storage r = registrations[_registrationId];
        require(_registrationId > 0 && _registrationId <= registrationCounter, "Invalid registration ID");
        require(!r.executed, "Registration already executed");
        require(r.approvals[msg.sender] == ApprovalStatus.PENDING, "Already voted on this registration");

        r.approvals[msg.sender] = ApprovalStatus.APPROVED;
        emit RegistrationApproved(_registrationId, msg.sender);

        if (hasAllRegistrationApprovals(_registrationId)) {
            _executeRegistration(_registrationId);
        }
    }

    /**
     * @dev Allows an authority to reject a registration request, starting a 3-day grace period.
     */
    function rejectRegistration(uint _registrationId) public onlyAuthority {
        Registration storage r = registrations[_registrationId];
        require(_registrationId > 0 && _registrationId <= registrationCounter, "Invalid registration ID");
        require(!r.executed, "Registration already executed");
        require(r.approvals[msg.sender] == ApprovalStatus.PENDING, "Already voted on this registration");

        r.approvals[msg.sender] = ApprovalStatus.REJECTED;
        
        // If this is the first rejection for this application, start the timer.
        if (!r.isRejected) {
            r.isRejected = true;
            r.rejectionTimestamp = block.timestamp;
        }

        emit RegistrationRejected(_registrationId, msg.sender);
    }

    /**
     * @dev Allows the original applicant to resubmit a rejected application within the 3-day grace period.
     * This resets all approval votes.
     */
    function resubmitRegistration(uint _registrationId, string memory _newLocation, string memory _newIpfsHash) public {
        Registration storage r = registrations[_registrationId];
        require(_registrationId > 0 && _registrationId <= registrationCounter, "Invalid registration ID");
        require(r.prospectiveOwner == msg.sender, "Only the applicant can resubmit");
        require(r.isRejected, "Application was not in a rejected state");
        require(!r.executed, "Application was already executed");
        require(block.timestamp < r.rejectionTimestamp + 3 days, "Resubmission period has expired");
        
        // If the location is being changed, ensure the new one is not already taken.
        // CORRECTED LINE BELOW:
        if (keccak256(bytes(r.location)) != keccak256(bytes(_newLocation))) {
            require(!locationExists[_newLocation], "New location is already registered");
        }

        // Update application details
        r.location = _newLocation;
        r.ipfsHash = _newIpfsHash;
        
        // Reset rejection state and all approvals
        r.isRejected = false;
        r.rejectionTimestamp = 0;
        r.approvals[KITWE_CITY_COUNCIL] = ApprovalStatus.PENDING;
        r.approvals[COMMISSIONER_OF_LAND] = ApprovalStatus.PENDING;
        r.approvals[LANDS_DEEDS_REGISTRY] = ApprovalStatus.PENDING;
        r.approvals[TREASURY] = ApprovalStatus.PENDING;

        emit RegistrationResubmitted(_registrationId);
    }

    /**
     * @dev Internal function to finalize a registration and create the land record.
     */
    function _executeRegistration(uint _registrationId) internal {
        Registration storage r = registrations[_registrationId];
        require(!r.executed, "Registration already executed");

        landCounter++;
        lands[landCounter] = Land(
            landCounter,
            r.prospectiveOwner,
            r.location,
            r.ipfsHash,
            block.timestamp
        );
        r.executed = true;
        locationExists[r.location] = true; // Mark location as registered

        emit LandRegistered(landCounter, r.prospectiveOwner, r.location, r.ipfsHash, block.timestamp);
    }

    /**
     * @dev Checks if all authorities have approved a registration.
     */
    function hasAllRegistrationApprovals(uint _registrationId) internal view returns (bool) {
        Registration storage r = registrations[_registrationId];
        return (r.approvals[KITWE_CITY_COUNCIL] == ApprovalStatus.APPROVED &&
                r.approvals[COMMISSIONER_OF_LAND] == ApprovalStatus.APPROVED &&
                r.approvals[LANDS_DEEDS_REGISTRY] == ApprovalStatus.APPROVED &&
                r.approvals[TREASURY] == ApprovalStatus.APPROVED);
    }

    // --- Transfer Functions (Modified) ---
    function initiateTransfer(uint _landId, address _newOwner) public landExists(_landId) onlyVerifiedUser {
        require(msg.sender == lands[_landId].owner, "Only land owner can initiate transfer");
        require(_newOwner != address(0), "Invalid recipient address");
        require(_newOwner != msg.sender, "Cannot transfer to yourself");

        transactionCounter++;
        Transaction storage t = transactions[transactionCounter];
        t.landId = _landId;
        t.newOwner = _newOwner;
        t.initiator = msg.sender;

        t.approvals[KITWE_CITY_COUNCIL] = ApprovalStatus.PENDING;
        t.approvals[COMMISSIONER_OF_LAND] = ApprovalStatus.PENDING;
        t.approvals[LANDS_DEEDS_REGISTRY] = ApprovalStatus.PENDING;
        t.approvals[TREASURY] = ApprovalStatus.PENDING;

        emit LandTransferInitiated(transactionCounter, _landId, msg.sender, _newOwner);
    }

    function approveTransfer(uint _transactionId) public onlyAuthority {
        Transaction storage t = transactions[_transactionId];
        require(_transactionId > 0 && _transactionId <= transactionCounter, "Invalid transaction ID");
        require(!t.executed, "Transaction already executed");
        require(t.approvals[msg.sender] == ApprovalStatus.PENDING, "Already voted on this transaction");

        t.approvals[msg.sender] = ApprovalStatus.APPROVED;
        emit ApprovalReceived(_transactionId, msg.sender, ApprovalStatus.APPROVED);

        if (hasAllTransferApprovals(_transactionId)) {
            _executeTransfer(_transactionId);
        }
    }

    function rejectTransfer(uint _transactionId) public onlyAuthority {
        Transaction storage t = transactions[_transactionId];
        require(_transactionId > 0 && _transactionId <= transactionCounter, "Invalid transaction ID");
        require(!t.executed, "Transaction already executed");
        require(t.approvals[msg.sender] == ApprovalStatus.PENDING, "Already voted on this transaction");

        t.approvals[msg.sender] = ApprovalStatus.REJECTED;
        emit ApprovalReceived(_transactionId, msg.sender, ApprovalStatus.REJECTED);
    }
    
    function hasAllTransferApprovals(uint _transactionId) internal view returns (bool) {
        Transaction storage t = transactions[_transactionId];
        return (t.approvals[KITWE_CITY_COUNCIL] == ApprovalStatus.APPROVED &&
                t.approvals[COMMISSIONER_OF_LAND] == ApprovalStatus.APPROVED &&
                t.approvals[LANDS_DEEDS_REGISTRY] == ApprovalStatus.APPROVED &&
                t.approvals[TREASURY] == ApprovalStatus.APPROVED);
    }

    function _executeTransfer(uint _transactionId) internal {
        Transaction storage t = transactions[_transactionId];
        require(!t.executed, "Transaction already executed");

        Land storage land = lands[t.landId];
        address previousOwner = land.owner;
        land.owner = t.newOwner;
        t.executed = true;

        emit LandTransferred(_transactionId, t.landId, previousOwner, t.newOwner);
    }

    // --- View Functions (Unchanged + New) ---
    function getLand(uint _id) public view landExists(_id) returns (Land memory) {
        return lands[_id];
    }
    
    function getPendingVerificationAddresses() public view returns (address[] memory) {
        return pendingVerificationAddresses;
    }

    function getTransactionApprovals(uint _transactionId) public view returns (ApprovalStatus, ApprovalStatus, ApprovalStatus, ApprovalStatus) {
        require(_transactionId > 0 && _transactionId <= transactionCounter, "Invalid transaction ID");
        Transaction storage t = transactions[_transactionId];
        return (t.approvals[KITWE_CITY_COUNCIL], t.approvals[COMMISSIONER_OF_LAND], t.approvals[LANDS_DEEDS_REGISTRY], t.approvals[TREASURY]);
    }

    function getRegistrationApprovals(uint _registrationId) public view returns (ApprovalStatus, ApprovalStatus, ApprovalStatus, ApprovalStatus) {
        require(_registrationId > 0 && _registrationId <= registrationCounter, "Invalid registration ID");
        Registration storage r = registrations[_registrationId];
        return (r.approvals[KITWE_CITY_COUNCIL], r.approvals[COMMISSIONER_OF_LAND], r.approvals[LANDS_DEEDS_REGISTRY], r.approvals[TREASURY]);
    }
    function getVerificationApprovals(address _userAddress) public view returns (ApprovalStatus, ApprovalStatus, ApprovalStatus, ApprovalStatus) {
        require(_userAddress != address(0), "Invalid user address");
        Verification storage v = verifications[_userAddress];
        return (v.approvals[KITWE_CITY_COUNCIL], v.approvals[COMMISSIONER_OF_LAND], v.approvals[LANDS_DEEDS_REGISTRY], v.approvals[TREASURY]);
    }
}