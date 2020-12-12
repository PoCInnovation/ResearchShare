import React, { useState, useEffect } from 'react';
import '../../../css/UserContract.css';

import PulseLoader from 'react-spinners/PulseLoader';

import { UserInteract } from './UserInteract';

const contract_abi = require('../../../contracts/users/users_abi.json');

async function loadContract(setContract, setSpinner) {
    setSpinner(true);
    const contract = await new window.web3.eth.Contract(contract_abi, '0xdA266cfaa6663BbAAc6a60aF26507874Da4bdA13');
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