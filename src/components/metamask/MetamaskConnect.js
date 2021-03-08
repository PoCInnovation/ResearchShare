import React, { useEffect, useState } from 'react';

import { ContractUser } from '../user/UserContract';
import { makeStyles } from '@material-ui/core/styles';

import { connectToMetamask } from '../../utils/Utils';

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