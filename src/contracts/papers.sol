//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

contract Papers {
    struct Metadata {
        string[] fields;
    }

    // string == IPFS Hash of a paper
    mapping (address => string) userToPaper;
    mapping (string => Metadata) paperToMetadata;

    function addPaper(string memory _ipfsHash) public {
        userToPaper[msg.sender] = _ipfsHash;
    }

    function addMetadataToPaper(string memory _ipfsHash, Metadata memory _md) public {
        paperToMetadata[_ipfsHash] = _md;
    }
}
