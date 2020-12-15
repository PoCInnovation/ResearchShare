import React, { useEffect, useState } from 'react';

import { ContractUser } from './user/UserContract';

import Web3 from 'web3';

function connectToMetamask(window, setCurrentAccount) {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.autoRefreshOnNetworkChange = false;
        window.ethereum
        .request({method : 'eth_requestAccounts'})
        .then((value) => setCurrentAccount(value[0]))
        .catch(() => console.log('Please connect to MetaMask.'));
    } else if (!window.web3) {
        alert('Please install MetaMask!');
    }
}

export function MetamaskHandling() {
    const [currentAccount, setCurrentAccount] = useState(null);

    useEffect(() => connectToMetamask(window, setCurrentAccount), []);

    return (
        currentAccount ? <ContractUser accountsAddresses={currentAccount}/> : null
    );
}