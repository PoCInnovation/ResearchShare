import React, { useEffect, useState } from 'react';

import { ContractUser } from '../user/UserContract';
import { makeStyles } from '@material-ui/core/styles';

import Web3 from 'web3';

/**
 * ask user to link his metamask account
 * @param window - Global Window
 * @param setCurrentAccount - function to setAccount
 */
function connectToMetamask(window, setCurrentAccount) {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.autoRefreshOnNetworkChange = false;
        window.ethereum
        .request({method : 'eth_requestAccounts'})
        .then((value) => setCurrentAccount(value[0]))
        .catch(() => alert('Please connect to MetaMask.'));
    } else if (!window.web3) {
        alert('Please install MetaMask!');
    }
}

const useStyles = makeStyles((theme) => ({
    register: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'black'
    }
}));

export function MetamaskHandling() {
    const [currentAccount, setCurrentAccount] = useState(null);

    const classes = useStyles();

    useEffect(() => connectToMetamask(window, setCurrentAccount), []);

    return (
        <div className={classes.register}>
            <h2>Register</h2>
            {currentAccount ? <ContractUser accountsAddresses={currentAccount}/> : null}
        </div>
    );
}