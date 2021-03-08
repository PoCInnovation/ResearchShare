import React, { useState, useEffect } from 'react';

import PulseLoader from 'react-spinners/PulseLoader';

import { UserInteract } from './UserInteract';
import './UserContract.css';

const rs_contract = require('../../contracts/compiledContract.json').contracts["researchShare.sol"].ResearchShare;

async function loadContract(address, setContract, setSpinner) {
    setSpinner(true);
    const contract = await new window.web3.eth.Contract(rs_contract.abi, address);
    await setContract(contract);
    setSpinner(false);
}

export function ContractUser({accountsAddresses}) {
    const [spinner, setSpinner] = useState(false);
    const [contract, setContract] = useState(null);

    const accounts = [accountsAddresses];
    useEffect(() => {
        loadContract(process.env.REACT_APP_CONTRACT_ADDRESS, setContract, setSpinner);
    }, []);

    return (
        <div id="ConcatContract">
            <div id="margins">
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
        </div>
    );
}