//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0;

contract Add {
    string public result;

    string str1;
    string str2;

    constructor(string memory _str1, string memory _str2) {
        str1 = _str1;
        str2 = _str2;
    }

    function setFirstString(string memory _str) public {
        str1 = _str;
    }

    function setSecondString(string memory _str) public {
        str2 = _str;
    }

    function _concat(string memory _str1, string memory _str2) private pure returns (string memory) {
        return string(abi.encodePacked(_str1, _str2));
    }

    function computeResult() public {
        result = _concat(str1, str2);
    }
}