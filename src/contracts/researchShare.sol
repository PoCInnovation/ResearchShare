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
    function submitPaper(string memory _ipfsHash, string memory _scope) public {
        uint submitId = newSubmit(_ipfsHash);
        address[] memory reviewers = findReviewers(_scope, _ipfsHash);

        addReviewers(submitId, reviewers);
        emit ReviewRequest(_ipfsHash, reviewers);
    }

    /**
     * TODO: Add proper parameters
     * TODO: Add process of finding reviewers
     **/
    function findReviewers(string memory _scope, string memory _ipfsHash) private view returns (address[] memory) {
        require(fieldToUser[_scope].length > 0, "No available reviewer for this field");
        address[] memory reviewers = new address[](3);
        address[] storage potentialReviewers = fieldToUser[_scope];
        // TODO: Use better random generation (i.e : Randao)
        uint rand_val = _generateRandomNum(0, potentialReviewers.length, _ipfsHash);
        reviewers[0] = (potentialReviewers[rand_val]);
        return (reviewers);
    }
}
