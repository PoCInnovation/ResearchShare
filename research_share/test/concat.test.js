require('mocha');

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const contract_abi = require('../src/contracts/concat_abi.json');
const contract_bytecode = require('../src/contracts/concat_bytecode.json');

const provider = ganache.provider();
const web3 = new Web3(provider);

describe('test', () => {
    let accounts = undefined;
    let contract = undefined;

    beforeEach(async () => {
        accounts = await web3.eth.getAccounts();
        contract = await new web3.eth.Contract(contract_abi).deploy(
                {data : contract_bytecode.object, arguments: ['Hello', 'World']}
            ).send({from: accounts[0], gas: '1000000'});
        contract.setProvider(provider);
    });
    it('contract deployed', async () => {
        assert.ok(contract.options.address);
    });
    it('simple contractition', async () => {
        await contract.methods.computeResult().send({from: accounts[0]});
        const result = await contract.methods.result().call();
        assert.equal(result, 'HelloWorld');
    });
    it('set numbers plus contractition', async () => {
        await contract.methods.setFirstString('-10').send({from: accounts[0]})
        await contract.methods.setSecondString('37').send({from: accounts[0]})
        await contract.methods.computeResult().send({from: accounts[0]});
        const result = await contract.methods.result().call();
        assert.equal(result, '-1037');
    })
});