import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';

import { AccountsArray } from './AccountsArray';

import { truncate } from '../../../Utils';
import { DeployButton } from './DeployButton';

const Web3 = require('web3');

const contract_abi = require('../../../contracts/concat_abi.json');
const contract_bytecode = require('../../../contracts/concat_bytecode.json');

async function ethEnabled(window) {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.autoRefreshOnNetworkChange = false;
        return await window.ethereum.request({method : 'eth_requestAccounts'});
    }
    return null;
}

/*
.catch((error) => {
        if (error.code === 4001) {
          console.log('Please connect to MetaMask.');
        } else {
          console.error(error);
        }})
*/
async function updateAccountInfos(accounts, setAccountAddress, setAccountBalance) {
    let addresses = undefined;
    await accounts.then((value) => {addresses = value;});

    setAccountAddress(truncate(addresses[0], 25));
    const balance = await window.ethereum.request(
        {method: "eth_getBalance", params: [addresses[0], "latest"]}
    );
    setAccountBalance((
        parseFloat(parseInt(balance, 16).toString()) / Math.pow(10,18))
        .toPrecision(5) + ' ETH'
    );
    return (addresses);
}

async function updateBalance(accounts, setAccountBalance, setHideLoader) {
    const balance = await window.ethereum.request(
        {method: "eth_getBalance", params: [accounts[0], "latest"]}
    );
    if (balance) {
        setHideLoader(true);
    }
    setAccountBalance((
        parseFloat(parseInt(balance, 16).toString()) / Math.pow(10,18))
        .toPrecision(5) + ' ETH'
    );
}

export function ContractConcat() {
    const [accountAddress, setAccountAddress] = useState(null);
    const [accountBalance, setAccountBalance] = useState(null);

    const [hideLoader, setHideLoader] = useState(true);
    const [isContractDeployed, setIsContractDeployed] = useState(false);

    const [contractAddress, setContractAddress] = useState(null);

    let contract = undefined;
    let accounts = ethEnabled(window);

    function alertIfMetamaskIsNotInstalled() {
        if (!accounts) {
            alert("Please install MetaMask to use this dApp!");
        }
    }
    useEffect(alertIfMetamaskIsNotInstalled, []);

    async function handleClick(event) {
        accounts = await updateAccountInfos(
            accounts, setAccountAddress, setAccountBalance
        );
        setHideLoader(false);
        contract = await new window.web3.eth.Contract(contract_abi).deploy(
            {data : contract_bytecode.object, arguments: ['Hello', 'World']}
        ).send({from: accounts[0], gas: '1000000'});
        setContractAddress(truncate(contract.options.address, 15));
        updateBalance(accounts, setAccountBalance, setHideLoader);
        setIsContractDeployed(true);
    }

    return (
        <div className="test_smart_contract">
            { !isContractDeployed ?
                <DeployButton handleClick={handleClick}/>
            : null }

            { isContractDeployed ?
                <p><h3>{'Contract ' + contractAddress}</h3></p>
            : null }

            <AccountsArray
                hideLoader={hideLoader}
                addresses={[accountAddress]}
                balances={[accountBalance]}
            />

            { isContractDeployed ?
                <React.Fragment>
                    <input type='text'></input>
                    <Button color="primary" variant="contained" onClick={handleClick}>
                        setFirstString
                    </Button>
                    <input type='text'></input>
                    <Button color="primary" variant="contained" onClick={handleClick}>
                        setFirstString
                    </Button>
                </React.Fragment>
            : null }
        </div>
    );
}