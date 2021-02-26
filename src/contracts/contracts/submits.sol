//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "./reviews.sol";

/**
 * A Submit corresponds to a proposal of Paper so we use the Paper's IPFS hash,
 * which is represented by a string, to represent it.
 *
 * Each Submit triggers a review process. Each reviewers can add a Review to a Submit.
 **/
contract Submits is Reviews {
    uint constant private notSubmitted = 0;
    uint private currentSubmitId = 1;
    mapping(uint => string) private idToSubmit;
    mapping(string => uint) private submitToId;

    mapping(address => uint[]) userToSubmitsIds;

    mapping(uint => Review[]) submitIdToReviews;
    mapping(uint => address[]) private submitIdToReviewers;

    event ReviewSubmit(
        string ipfsHash,
        address reviewer,
        ReviewStatus status,
        ChangeRequest[] requests
    );

    /**
     * Restrict access to reviewers only
     *
     * @param _ipfsHash Submit identifier
     */
    modifier onlyReviewer(string memory _ipfsHash) {
        address[] memory submit_reviewers = submitIdToReviewers[submitToId[_ipfsHash]];
        bool is_reviewer = false;
        for (uint i = 0; i < submit_reviewers.length && is_reviewer == false; ++i) {
            if (msg.sender == submit_reviewers[i]) {
                is_reviewer = true;
            }
        }
        require(is_reviewer == true, "User is not a reviewer for this paper");
        _;
    }

    /**
     * Add a submit to "userToSubmits" if it doesn't exists.
     *
     * @param _ipfsHash Hash of the submitted file.
     **/
    function newSubmit(string memory _ipfsHash) internal returns (uint) {
        require(submitToId[_ipfsHash] == notSubmitted);

        uint id = currentSubmitId;
        currentSubmitId += 1;

        submitToId[_ipfsHash] = id;
        idToSubmit[id] = _ipfsHash;

        userToSubmitsIds[msg.sender].push(id);
        return id;
    }

    /**
     * Add Reviwers to a submit.
     *
     * @param _submitId  Id of the submit.
     * @param _reviewers List of the reviewers.
     **/
    function addReviewers(uint _submitId, address[] memory _reviewers) public {
        submitIdToReviewers[_submitId] = _reviewers;
    }

    /**
     * Add a new review to a submit and returns the review's id;
     *
     * @param _ipfsHash Hash of the submitted file.
     * @param _status   What the reviewers think should happen next to the submit.
     * @param _requests Change requests (could be empty)
     **/
    function submitReview(string memory _ipfsHash, ReviewStatus _status, ChangeRequest[] memory _requests) public onlyReviewer(_ipfsHash) returns (uint) {
        uint id = submitToId[_ipfsHash];
        require(id != notSubmitted);

        Review memory review = createReview(_status, _requests);
        submitIdToReviews[id].push(review);

        emit ReviewSubmit(_ipfsHash, msg.sender, _status, _requests);
        return review.id;
    }
}
