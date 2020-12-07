//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

contract Reviews {
    struct ChangeRequest {
        string comment;
        int page; // -1 if the CR is for the whole submit
        int line; // -1 if the CR is for the whole submit
    }

    enum ReviewStatus {
        Accepted,
        Rejected,
        ChangeRequested
    }

    struct Review {
        ReviewStatus status;
        uint256 id;
    }

    mapping(uint256 => ChangeRequest[]) reviewIdToChangeRequests;
    uint256 private currentReviewId = 0;


    /**
     * Create a review and returns it's id so the front can possibly add ChangeRequests
     *
     * @param _status   what the reviewers think should happen next (accept, reject, change).
     **/
    function createReview(ReviewStatus _status) public returns (Review memory) {
        Review memory review = Review({
            status: _status,
            id: currentReviewId
        });

        currentReviewId++;
        return review;
    }

    /**
     * Add a list of requests to a newly created review.
     *
     * @param _reviewId Id freshly returned by @createReview.
     * @param _requests List of the requests asked by the reviewer.
     *
     * The front will ask the reviewer the status of its review, and right after
     * it will ask if he wants to add ChangeRequests.
     * The reviewer will create _requests array the front which will call 'createChangeRequest'
     **/
    function addChangeRequestToReview(uint256 _reviewId, ChangeRequest[] memory _requests) public {
        uint changeRequestCount = reviewIdToChangeRequests[_reviewId].length;
        require(changeRequestCount == 0);

        for (uint i = 0; i != changeRequestCount; i += 1) {
            reviewIdToChangeRequests[_reviewId].push(_requests[i]);
        }
    }

    /**
     * Helper function which simply returns a ChangeRequest.
     *
     * @param _comment What the reviewers think is not okay or wants changed
     * @param _page    The page concerned by the comment (-1 if it's for the whole paper)
     * @param _line    The line concerned by the comment (-1 if it's for the whole paper)
     *
     * Due to the length of a call to a contract, I think it would be best if the front
     * can create the changeRequests by itself.
     **/
    function createChangeRequest(string memory _comment, int _page, int _line)
        public pure returns (ChangeRequest memory) {
        return ChangeRequest({
            comment: _comment,
            page: _page,
            line: _line
        });
    }
}
