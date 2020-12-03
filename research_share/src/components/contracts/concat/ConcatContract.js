import React, { useState, useEffect } from 'react';

import { truncate } from '../../../Utils';
import { AccountsArray } from '../AccountsArray';
import { DeployButton } from './ConcatDeployButton';
import { ConcatInteract } from './ConcatInteract';

const contract_abi = require('../../../contracts/concat_abi.json');
const contract_bytecode = require('../../../contracts/concat_bytecode.json');

//TODO loop on all the acocunts to fill all the balances
async function updateBalance(accounts, setAccountBalances) {
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

export function ContractConcatContent({accountsAddresses}) {
    const [accounts, setAccounts] = useState([accountsAddresses]);
    const [accountBalances, setAccountBalances] = useState(null);
    const [isLoaderLoading, setIsLoaderLoading] = useState(false);
    const [isContractDeployed, setIsContractDeployed] = useState(false);
    const [contract, setContract] = useState(null);

    useEffect(() => {
        updateBalance(accounts, setAccountBalances);
    }, [accounts, isContractDeployed]);

    async function handleClick(event) {
        setIsLoaderLoading(true);
        setContract(await new window.web3.eth.Contract(contract_abi).deploy(
            {data : contract_bytecode.object, arguments: ['Hello', 'World']}
        ).send({from: accounts[0], gas: '1000000'}));
        setIsContractDeployed(true);
        setIsLoaderLoading(false);
    }

    return (
        <div className="test_smart_contract">

            { isContractDeployed ?
                <h3>
                    <p>
                        Contract {contract ? truncate(contract.options.address, 15) : null} succesfuly deployed !
                    </p>
                </h3>
                :
                <DeployButton handleClick={handleClick}/>
            }

            <AccountsArray
                isLoaderLoading={isLoaderLoading}
                addresses={accounts}
                balances={[accountBalances]}
            />

            { isContractDeployed ? <ConcatInteract/> : null }
        </div>
    );
}