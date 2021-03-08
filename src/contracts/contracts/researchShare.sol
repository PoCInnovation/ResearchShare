//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

import "./users.sol";
import "./submits.sol";
import "./papers.sol";

contract ResearchShare is Users, Submits, Papers {

    /**
     * Emitted event when a review is require (= paper si submitted)
     *
     * @param _ipfsHash paper ipfs hash
     * @param reviewers reviewer list
     */
    event ReviewRequest(
        string _ipfsHash,
        address[] reviewers
    );

    /**
     * Emitted event when a review is validated
     *
     * @param _ipfsHash paper ipfs hash
     */
    event Validation(
        string _ipfsHash
    );

    mapping(string => bool) ipfsHashToValidationStatus;

    /**
     * Deprecated
     * Generate random number from date using keccak
     * This is only for tests. Use RANDAO in production instead
     * @param _x Lower Bound
     * @param _y Upper Bound
     * @param _seed seed fo number generation
     */
    function _generateRandomNum(uint _x, uint _y, string memory _seed) private pure returns (uint) {
        require(_x < _y);
        uint randVal = uint(keccak256(abi.encodePacked(_seed))) % (_y - _x) + _x;
        return (randVal);
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

    /**
     * Answer true if the paper where _ipfsHash is pointing has been validated into this contract
     *
     * @param _ipfsHash ipfs hash pointing to the document to certify
     */
    function certPaper(string memory _ipfsHash) public view returns(bool){
        return (ipfsHashToValidationStatus[_ipfsHash]);
    }

    /**
     * Creates a Submit and start the Review process.
     *
     * @param _ipfsHash Hash of the submitter Paper.
     * @param _field Research field
     **/
    function submitPaper(string memory _ipfsHash, string memory _field) public {
        uint submitId = newSubmit(_ipfsHash);
        address[] memory reviewers = findReviewers(_field, _ipfsHash, 1);

        addReviewers(submitId, reviewers);
        emit ReviewRequest(_ipfsHash, reviewers);
    }

    /**
     * Publish the paper on ipfs
     *
     * @param _ipfsHash ipfsHash to publish
     */
    function publishPaper(string memory _ipfsHash) private {
        ipfsHashToValidationStatus[_ipfsHash] = true;
    }

    /**
     * CallBack function called when a review is added
     *
     * @param _ipfsHash submit ipfs hash
     */
    function onReview(string memory _ipfsHash) private {
        uint256 submit_id = submitToId[_ipfsHash];
        address[] memory reviewers = submitIdToReviewers[submit_id];
        Review[] memory reviews = submitIdToReviews[submit_id];
        uint16 validations = 0;

        for (uint i = 0; i < reviewers.length; ++i) {
            for (uint j = 0; j < reviews.length; ++j) {
                if (reviews[j].status == ReviewStatus.Accepted && reviews[j].reviewer == reviewers[i]) {
                    validations += 1;
                    break;
                }
            }
        }
        if (validations == reviewers.length) {
            publishPaper(_ipfsHash);
            emit Validation(_ipfsHash);
        }
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
        onReview(_ipfsHash);
        return review.id;
    }
}