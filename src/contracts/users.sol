//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.4;
pragma experimental ABIEncoderV2;

contract Users {
    struct User {
        string firstname;
        string lastname;
        string[] fields;
    }

    mapping (address => User) private users;
    mapping (string => address[]) internal fieldToUser;

    function registerUser(string memory _firstname, string memory _lastname, string[] memory _fields) public {
        users[msg.sender] = User({
            firstname: _firstname,
            lastname: _lastname,
            fields: _fields
        });
        for (uint i = 0; i < _fields.length; i++) { fieldToUser[_fields[i]].push(msg.sender); }
    }

    function getUser() public view returns (User memory) {
        return users[msg.sender];
    }
}
