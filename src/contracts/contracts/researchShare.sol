//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "./users.sol";
import "./submits.sol";
import "./papers.sol";

contract ResearchShare is Users, Submits, Papers {

    event ReviewRequest(
        string _ipfsHash,
        address[] reviewers
    );

    /**
     * Deprecated
     * Generate random number from date using keccak
     * This is only for tests. Use RANDAO in production instead
     */
    function _generateRandomNum(uint _x, uint _y, string memory _seed) public pure returns (uint) {
        require(_x < _y);
        uint randVal = uint(keccak256(abi.encodePacked(_seed))) % (_y - _x) + _x;
        return (randVal);
    }

    /**
     * Creates a Submit and start the Review process.
     *
     * @param _ipfsHash Hash of the submitter Paper.
     **/
    function submitPaper(string memory _ipfsHash, string memory _field) public {
        uint submitId = newSubmit(_ipfsHash);
        address[] memory reviewers = findReviewers(_field, _ipfsHash, 1);

        addReviewers(submitId, reviewers);
        emit ReviewRequest(_ipfsHash, reviewers);
    }

    /**
     * Find reviewers random reviewers based on their competence fields
     *
     * @param _field Corresponding research field
     * @param _ipfsHash Paper ipfs hash
     * @param _n Number of reviewers to find
     **/
    function findReviewers(string memory _field, string memory _ipfsHash, uint256 _n) private view returns (address[] memory) {
        require(fieldToUser[_field].length >= _n, "Not enough reviewer available for this field");
        address[] memory reviewers = new address[](_n);
        address[] storage potentialReviewers = fieldToUser[_field];
        uint rand_val = _generateRandomNum(0, potentialReviewers.length, _ipfsHash);
        for (uint i = 0; i < _n; i++) { reviewers[_n] = (potentialReviewers[rand_val + i]); }
        return (reviewers);
    }
}