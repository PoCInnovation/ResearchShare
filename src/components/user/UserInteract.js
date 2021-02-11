import React, {useState} from 'react';
import './UserInteract.css';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
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
    const [userInfos, setUserInfos] = useState({firstName: '', familyName: '', fields: [null]});
    const [field, setField] = useState('');
    const [user, setUser] = useState(null);

    const handleClickRegisterUser = () => {
        contractCaller(
            () => registerUser(contract, accounts, userInfos),
            accounts,
            setSpinner
        )
        setUserInfos({firstName: '', familyName: '', fields: [null]});
    }

    const handleClickGetUser = () => {
        const user = contractCaller(
            async () => {
                await getCurrentUser(contract, accounts).then((value) => {
                    setUser(value);
                    setSpinner(false);
                });
                return (user);
            },
            accounts,
            setSpinner
        )
    }

    const handleClickAddField = () => {
        if (userInfos.fields[0] == null) {
            setUserInfos({...userInfos, fields: [field]});
        } else {
            setUserInfos({...userInfos, fields: [...userInfos.fields, field]});
        }
        setField('')
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
                <div>
                    <p>Fields:</p>
                    <div id="fields">
                        <Input className="input_field" type="text" value={field}
                               onChange={(e) => setField(e.target.value)}/>
                        <Button className="button_field" color="primary" variant="contained"
                                onClick={handleClickAddField}>
                            <AddIcon/>
                        </Button>
                    </div>
                    <br/>
                    {userInfos.fields[0] != null ?
                        <ul id="list">
                            {userInfos.fields.map((value, index) => {
                                return <li key={index}>{value}</li>
                            })}
                        </ul>
                        : null}
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
                        <p>Fields:&nbsp;
                            {user[2].map((value, index) => {
                                return value.concat(index !== user[2].length - 1 ? ', ' : '')
                            })}
                        </p>
                    </React.Fragment>
                }
            </div>
        </React.Fragment>
    );
}