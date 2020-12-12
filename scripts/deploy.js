const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
const replace = require('replace-in-file');
require('dotenv').config({path: './env'});

const provider = new HDWalletProvider(
	'envelope peace hospital average rocket island warfare puppy thank rabbit board harvest',
	'https://ropsten.infura.io/v3/c600a2bceb3742a5b476785dfefecfc4'
);
const web3 = new Web3(provider);

const contract = require('../src/contracts/users/users.json').contracts["Users.sol"].Users;

(async () => {
    const accounts = await web3.eth.getAccounts();

    console.log(`Attempting to deploy from account: ${accounts[0]}`);

    const deployedContract = await new web3.eth.Contract(contract.abi)
		.deploy({
			data: contract.evm.bytecode.object,
			arguments: null
		})
		.send({
			from: accounts[0],
			gas: '1000000'
		});
    console.log(
        `Contract deployed at address: ${deployedContract.options.address}`
    );
    const contract_address_replacer = new RegExp('REACT_APP_CONTRACT_ADDRESS=.*');
    replace.sync({
        files: '.env',
        from: contract_address_replacer,
        to: 'REACT_APP_CONTRACT_ADDRESS=' + deployedContract.options.address
    })
    provider.engine.stop();
})();