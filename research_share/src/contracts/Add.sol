//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0;

contract Add {
    int256 public result;

    int256 nb1;
    int256 nb2;

    constructor(int256 _nb1, int256 _nb2) {
        nb1 = _nb1;
        nb2 = _nb2;
    }

    function setFirstNumber(int256 _nb) public {
        nb1 = _nb;
    }

    function setSecondNumber(int256 _nb) public {
        nb2 = _nb;
    }

    function _add(int256 _nb1, int256 _nb2) private pure returns (int256) {
        return _nb1 + _nb2;
    }

    function computeResult() public {
        result = _add(nb1, nb2);
    }
}