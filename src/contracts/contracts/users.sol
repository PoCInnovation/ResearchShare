//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

contract Users {
    struct User {
        string firstname;
        string lastname;
        string[] fields;
    }

    mapping (address => User) private users;
    mapping (string => address[]) internal fieldToUser;

    /**
        User registration

        @param _firstname user first name
        @param _lastname user last name
        @param _fields user fields
     */
    function registerUser(string memory _firstname, string memory _lastname, string[] memory _fields) public {
        require(bytes(_firstname).length != 0, "You must specify a non-empty user firstname");
        require(bytes(_lastname).length != 0, "You must specify a non-empty user lastname");
        require(_fields.length > 0, "You must specify at least one field");
        users[msg.sender] = User({
            firstname: _firstname,
            lastname: _lastname,
            fields: _fields
        });
        for (uint i = 0; i < _fields.length; i++) { fieldToUser[_fields[i]].push(msg.sender); }
    }

    function getUser() public view returns (User memory) {
        require(bytes(users[msg.sender].firstname).length > 0, "User is not registered yet");
        return users[msg.sender];
    }
}
