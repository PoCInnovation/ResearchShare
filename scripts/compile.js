const fs = require('fs-extra');
const solc = require('solc');
const path = require('path');

const input = {
	language: 'Solidity',
	sources: {
		'Users.sol' : {
			content: fs.readFileSync('./src/contracts/users/users.sol', 'utf8')
		}
	},
	settings: {
		outputSelection: {
			'*': {
				'*': [ 'abi', 'evm.bytecode' ]
			}
		}
	}
};

(() => {
	const compiledContract = JSON.parse(solc.compile(JSON.stringify(input)));

	fs.writeJsonSync(
		'./src/contracts/users/users.json',
		compiledContract,
		{
			spaces: 2
		}
	);
})();