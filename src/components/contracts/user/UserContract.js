import React, { useState, useEffect } from 'react';
import '../../../css/ConcatContract.css';

import { truncate } from '../../../Utils';
import { AccountsArray } from '../AccountsArray';
import { DeployButton } from './UserDeployButton';
import { UserInteract } from './UserInteract';

const contract_abi = require('../../../contracts/users/users_abi.json');
const contract_bytecode = require('../../../contracts/users/users_bytecode.json');

//TODO loop on all the acocunts to fill all the balances
export async function updateBalances(accounts, setAccountBalances) {
    for (const account of accounts) {
        const balance = await window.ethereum.request(
            {method: "eth_getBalance", params: [account, "latest"]}
        );
        setAccountBalances([(
            parseFloat(parseInt(balance, 16).toString()) / Math.pow(10,18))
            .toPrecision(5) + ' ETH']
        );
    }
}

export function ContractUser({accountsAddresses}) {
    const [accountBalances, setAccountBalances] = useState(null);
    const [spinner, setSpinner] = useState(false);
    const [isContractDeployed, setIsContractDeployed] = useState(false);
    const [contract, setContract] = useState(null);

    const accounts = [accountsAddresses];

    useEffect(() => {
        updateBalances(accounts, setAccountBalances);
    }, [accounts, isContractDeployed]);

    async function handleClick(event) {
        setSpinner(true);
        setContract(await new window.web3.eth.Contract(contract_abi).deploy(
            {data : contract_bytecode.object, arguments: null}
        ).send({from: accounts[0], gas: '1000000'}));
        setIsContractDeployed(true);
        setSpinner(false);
    }

    return (
        <div id="ConcatContract">
            { isContractDeployed ?
                <h3>
                    <p>
                        Contract {contract ? truncate(contract.options.address, 20) : null} successfully deployed !
                    </p>
                </h3>
                :
                <DeployButton handleClick={handleClick}/>
            }
    
            <AccountsArray
                spinner={spinner}
                addresses={accounts}
                balances={[accountBalances]}
            />

            { isContractDeployed ?
                <UserInteract
                    contract={contract}
                    accounts={accounts}
                    setSpinner={setSpinner}
                    setAccountBalances={setAccountBalances}
                />
            : null }
        </div>
    );
}