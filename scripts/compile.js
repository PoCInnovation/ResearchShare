const fs = require('fs-extra');
const solc = require('solc');

const input = {
	language: 'Solidity',
	sources: {
		'researchShare.sol' : {
			content: fs.readFileSync('./src/contracts/contracts/researchShare.sol', 'utf8')
		},
		'users.sol' : {
			content: fs.readFileSync('./src/contracts/contracts/users.sol', 'utf8')
		},
		'papers.sol' : {
			content: fs.readFileSync('./src/contracts/contracts/papers.sol', 'utf8')
		},
		'submits.sol' : {
			content: fs.readFileSync('./src/contracts/contracts/submits.sol', 'utf8')
		},
		'reviews.sol' : {
			content: fs.readFileSync('./src/contracts/contracts/reviews.sol', 'utf8')
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
		'./src/contracts/compiledContract.json',
		compiledContract,
		{
			spaces: 2
		}
	);
})();