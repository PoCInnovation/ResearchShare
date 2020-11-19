/*Includes all the needed functions in order to test the contract*/
const contract_abi = require('add_abi.json');
const contract_bytecode = require('add_bytecode.json');
const ganache = require('ganache-cli');
const provider ganache.provider();
const Web3 = require('web3');
const web3 = new Web3(provider);
const assert = require('assert');
