require('mocha');

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const contract_abi = require('../src/contracts/add_abi.json');
const contract_bytecode = require('../src/contracts/add_bytecode.json');

const provider = ganache.provider();
const web3 = new Web3(provider);

describe('test', () => {
    let accounts = undefined;
    let add = undefined;

    beforeEach(async () => {
        accounts = await web3.eth.getAccounts();
        add = await new web3.eth.Contract(contract_abi).deploy(
                {data : contract_bytecode.object, arguments: [15, 13]}
            ).send({from: accounts[0], gas: '1000000'});

        add.setProvider(provider);
    });
    it('contract deployed', async () => {
        assert.ok(add.options.address);
    });
    it('simple addition', async () => {
        await add.methods.computeResult().send({from: accounts[0]});
        const result = await add.methods.result().call();
        assert.equal(result, 28);
    });
    it('set numbers plus addition', async () => {
        await add.methods.setFirstNumber(-10).send({from: accounts[0]})
        await add.methods.setSecondNumber(37).send({from: accounts[0]})
        await add.methods.computeResult().send({from: accounts[0]});
        const result = await add.methods.result().call();
        assert.equal(result, 27);
    })
});