import React, { useState, useEffect } from 'react';
import '../../../css/UserContract.css';

import PulseLoader from 'react-spinners/PulseLoader';

import { UserInteract } from './UserInteract';

const users_contract = require('../../../contracts/users/users.json').contracts["Users.sol"].Users;

async function loadContract(setContract, setSpinner) {
    setSpinner(true);
    const contract = await new window.web3.eth.Contract(users_contract.abi, '0x82F1a3c8b3f5FBc867EeC47Dd3Ae0B9D6d68924a');
    await setContract(contract);
    setSpinner(false);
}

export function ContractUser({accountsAddresses}) {
    const [spinner, setSpinner] = useState(false);

    const [contract, setContract] = useState(null);
    const accounts = [accountsAddresses];

    useEffect(() => {
        loadContract(setContract, setSpinner);
    }, []);

    return (
        <div id="ConcatContract">
            <div style={{display: 'inline-block', position: 'relative', float: 'right'}}>
                <PulseLoader
                    css={spinner ? {display: 'block'} : {display: 'none'}}
                    size={10}
                    color={"#123abc"}
                />
            </div>

            { contract ?
                <UserInteract
                    contract={contract}
                    accounts={accounts}
                    setSpinner={setSpinner}
                />
            : null }
        </div>
    );
}