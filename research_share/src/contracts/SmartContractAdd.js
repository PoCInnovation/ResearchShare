import React, { useState, useEffect } from 'react';
import { truncate } from '../Utils';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core';

import '../App.css';

const Loaders = require('react-spinners');

const Web3 = require('web3');

const contract_abi = require('./concat_abi.json');
const contract_bytecode = require('./concat_bytecode.json');

const useStyles = makeStyles((theme) => ({
    title: {
        display: 'inline-block',
        position: 'relative',
    },
    title2: {
        display: 'inline-block',
        position: 'relative',
        marginLeft: '62px'
    }
}));

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

export function SmartContractAdd() {
    const [accountAddress, setAccountAddress] = useState(null);
    const [accountBalance, setAccountBalance] = useState(null);
    const [hideLoader, setHideLoader] = useState(true);

    const classes = useStyles();
    let accounts = ethEnabled(window);
    let contract = undefined;

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
        const contract = await new window.web3.eth.Contract(contract_abi).deploy(
                {data : contract_bytecode.object, arguments: ['Hello', 'World']}
        ).send({from: accounts[0], gas: '1000000'});
        updateBalance(accounts, setAccountBalance, setHideLoader);
        console.log(contract);
    }

    return (
        <div className="test_smart_contract">
            <Button color="primary" variant="contained" onClick={handleClick}>
                Deploy Contract
            </Button>
            <br/>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6" style={{margin: '4, 0, 2'}}>
                        <div className={hideLoader ? classes.title : classes.title2}>
                            Accounts
                        </div>
                        <div style={{display: 'inline-block', position: 'relative', float: 'right', marginRight: '20px'}}>
                            <Loaders.PulseLoader
                                css={hideLoader ? {display: 'none'} : {display: 'block'}}
                                size={10}
                                color={"#123abc"}
                            />
                        </div>
                    </Typography>
                    <div style={{backgroundColor: "#cccccc"}}>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary={accountAddress}
                                    secondary={accountBalance}
                                />
                            </ListItem>
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}