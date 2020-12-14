import React, { useState } from 'react';
import '../../../css/UserInteract.css';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

async function registerUser(contract, accounts, userInfos) {
    await contract.methods
        .registerUser(userInfos.firstName, userInfos.familyName, userInfos.fields)
        .send({from: accounts[0], gas: '1000000'});
}

async function getCurrentUser(contract, accounts) {
    let user = await contract.methods.getUser().call({from: accounts[0], gas: '1000000'});
    return (user);
}

export async function contractCaller(contractFunction, accounts, setSpinner) {
    setSpinner(true);
    const response = await contractFunction();
    setSpinner(false);
    return (response);
}

export function UserInteract({contract, accounts, setSpinner}) {
    const [userInfos, setUserInfos] = useState({firstName: '', familyName: '', fields: ['developer', 'scientist']});
    const [user, setUser] = useState(null);

    const handleClickRegisterUser = (e) => {
        contractCaller(
            () => registerUser(contract, accounts, userInfos),
            accounts,
            setSpinner
        )
        setUserInfos({firstName: '', familyName: ''});
    }

    const handleClickGetUser = () => {
        const user = contractCaller(
            async () => {
                await getCurrentUser(contract, accounts).then((value) => {
                    setUser(value);
                    console.log(value);
                    setSpinner(false);
                });
                return (user);
            },
            accounts,
            setSpinner
        )
    }

    return (
        <React.Fragment>
            <br/>
            <div className="formInputsForUsersRegister">
                <div>
                    <p>First Name:</p>
                    <Input className="stringInputs" type="text" value={userInfos.firstName}
                        onChange={(e) => setUserInfos({...userInfos, firstName: e.target.value})}/>
                </div>
                <br/>
                <div>
                    <p>Family Name:</p>
                    <Input className="stringInputs" type="text" value={userInfos.familyName}
                        onChange={(e) => setUserInfos({...userInfos, familyName: e.target.value})}/>
                </div>
                <br/>
                <br/>
                <Button className="button" color="primary" variant="contained"
                    onClick={handleClickRegisterUser}>
                    Sign Up
                </Button>
            </div>
            <br/><br/>
            <div>
                {!user ?
                    <Button className="button" color="primary" variant="contained"
                        onClick={handleClickGetUser}>
                        GET USER
                    </Button>
                    :
                    <React.Fragment>
                        <p>FirstName: {user[0]}</p>
                        <p>FamilyName: {user[1]}</p>
                        <p>Fields: {user[2][0] + ', ' + user[2][1]}</p>
                    </React.Fragment>
                }
            </div>
        </React.Fragment>
    );
}