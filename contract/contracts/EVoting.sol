// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract EVoting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    address public owner;
    mapping(address => bool) public allowedVoters;
    mapping(address => bool) public hasVoted;
    
    Candidate[] public candidates;

    event VoterWhitelisted(address indexed voter);
    event Voted(address indexed voter, uint indexed candidateId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    constructor(string[] memory _candidateNames) {
        owner = msg.sender;
        for (uint i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                id: i,
                name: _candidateNames[i],
                voteCount: 0
            }));
        }
    }

    function whitelistVoter(address _voter) external onlyOwner {
        allowedVoters[_voter] = true;
        emit VoterWhitelisted(_voter);
    }

    function vote(uint _candidateId) external {
        require(allowedVoters[msg.sender], "Not whitelisted");
        require(!hasVoted[msg.sender], "Already voted");
        require(_candidateId < candidates.length, "Invalid candidate ID");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit Voted(msg.sender, _candidateId);
    }

    function getCandidate(uint _id) external view returns (Candidate memory) {
        require(_id < candidates.length, "Invalid candidate ID");
        return candidates[_id];
    }

    function getCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }

    function getCandidatesCount() external view returns (uint) {
        return candidates.length;
    }
}
