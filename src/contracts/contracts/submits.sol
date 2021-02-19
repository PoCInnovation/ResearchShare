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
    mapping(uint => address[]) private submitIdToReviewers; // TODO: handle this in addReview & creation of it

    /**
     * Add a submit to "userToSubmits" if it doesn't exists.
     *
     * @param _ipfsHash Hash of the submitted file.
     **/
    function newSubmit(string memory _ipfsHash) public returns (uint) {
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
     **/
    function addReview(string memory _ipfsHash, ReviewStatus _status) public returns (uint) {
        uint id = submitToId[_ipfsHash];
        ChangeRequest[] memory requests;
        require(id != notSubmitted);

        Review memory review = createReview(_status, requests);
        submitIdToReviews[id].push(review);

        return review.id;
    }
}
