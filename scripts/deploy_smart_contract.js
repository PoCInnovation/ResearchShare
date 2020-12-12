const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const provider = new HDWalletProvider(
	'envelope peace hospital average rocket island warfare puppy thank rabbit board harvest',
	'https://ropsten.infura.io/v3/c600a2bceb3742a5b476785dfefecfc4'
);
const web3 = new Web3(provider);

const contract_abi = require('./src/contracts/users/users_abi.json');
const contract_bytecode = require('./src/contracts/users/users_bytecode.json');

(async () => {
    const accounts = await web3.eth.getAccounts();

    console.log(`Attempting to deploy from account: ${accounts[0]}`);

    const deployedContract = await new web3.eth.Contract(contract_abi)
		.deploy({
			data: contract_bytecode.object,
			arguments: null
		})
		.send({
			from: accounts[0],
			gas: '1000000'
		});

    	console.log(
            `Contract deployed at address: ${deployedContract.options.address}`
        );

        provider.engine.stop();
})();