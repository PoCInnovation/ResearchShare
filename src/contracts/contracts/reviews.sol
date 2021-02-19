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
     * Create a review and adds all the change requests to it.
     *
     * @param _status   What the reviewers think should happen next (accept, reject, change).
     * @param _requests List of the requests asked by the reviewer.
     **/
    function createReview(ReviewStatus _status, ChangeRequest[] memory _requests) public {
        Review memory review = Review({
            status: _status,
            id: currentReviewId
        });

        addChangeRequestToReview(review.id, _requests);
        currentReviewId++;
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
    function addChangeRequestToReview(uint256 _reviewId, ChangeRequest[] memory _requests) private {
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
     * TODO: Will probably removed because the front can build them on its own
     **/
//    function createChangeRequest(string memory _comment, int _page, int _line)
//        public pure returns (ChangeRequest memory) {
//        return ChangeRequest({
//            comment: _comment,
//            page: _page,
//            line: _line
//        });
//    }
}
