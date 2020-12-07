//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "users.sol";
import "submits.sol";
import "papers.sol";

contract ResearchShare is Users, Submits, Papers {
    /**
     * Creates a Submit and start the Review process.
     *
     * @param _ipfsHash Hash of the submitter Paper.
     **/
    function submitPaper(string memory _ipfsHash) public {
        uint submitId = newSubmit(_ipfsHash);
        address[] memory reviewers = findReviewers();

        addReviewers(submitId, reviewers);
        notifyReviewers(_ipfsHash, reviewers);
    }

    /**
     * TODO: Add proper parameters
     * TODO: Add process of finding reviewers
     **/
    function findReviewers() private view returns (address[] memory) {
        address[] memory reviewers;

        return reviewers;
    }

    /**
     * Sends notification to reviewers containing the paper's hash so they can review it.
     *
     * @param _ipfsHash  Hash of the submitted Paper.
     * @param _reviewers List of the reviewers to be notified.
     *
     * TODO: Does it really have its place here?
     *       Should "submitPaper" return the reviewers to the front so it can notify them?
     **/
    function notifyReviewers(string memory _ipfsHash, address[] memory _reviewers) private {
    }
}
