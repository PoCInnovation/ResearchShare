import React, { useState } from 'react';
import '../../../css/ConcatInteract.css';

import Button from '@material-ui/core/Button';

import { updateBalances } from './ConcatContract';

async function setFirstString(contract, accounts, param) {
    await contract.methods.setFirstString(param).send({from: accounts[0], gas: '1000000'});
}

async function setSecondString(contract, accounts, param) {
    await contract.methods.setSecondString(param).send({from: accounts[0], gas: '1000000'});
}

async function computeResult(contract, accounts, setResult) {
    await contract.methods.computeResult().send({from: accounts[0]});
    setResult(await contract.methods.result().call());
}

export function ConcatInteract({contract, accounts, setSpinner, setAccountBalances}) {
    const [result, setResult] = useState(null);
    const [firstInput, setFirstInput] = useState('');
    const [secondInput, setSecondInput] = useState('');

    function handleFirstInputChanges(e) {
        setFirstInput(e.target.value);
    }
    function handleSecondInputChanges(e) {
        setSecondInput(e.target.value);
    }
    async function handleButtonConcatClicks(e) {
        setSpinner(true);
        await computeResult(contract, accounts, setResult);
        setSpinner(false);
    }
    async function handleButtonClicks(button) {
        setSpinner(true);
        if (button === 'first') {
            await setFirstString(contract, accounts, firstInput);
        } else {
            await setSecondString(contract, accounts, secondInput);
        }
        updateBalances(accounts, setAccountBalances);
        setSpinner(false);
        button === 'first' ? setFirstInput('') : setSecondInput('');
    }

    return (
        <React.Fragment>
            <br/>
            <div>
                <input className="stringInputs" type="text" placeholder='String'
                    onChange={handleFirstInputChanges} value={firstInput}/>
                <Button className="submitButtons" color="primary" variant="contained"
                    onClick={(e) => handleButtonClicks('first')}>
                    setFirstString
                </Button>
            </div>
            <p><br/></p>
            <div>
                <input className="stringInputs" type='text' placeholder='String'
                    onChange={handleSecondInputChanges} value={secondInput}/>
                <Button className="submitButtons" color="primary" variant="contained"
                    onClick={(e) => handleButtonClicks('second')}>
                    setSecondString
                </Button>
            </div>
            <p><br/></p>
            <p><br/></p>
            <div>
                <Button className="lastButton" color="primary" variant="contained"
                    onClick={handleButtonConcatClicks}>
                    CONCAT
                </Button>
                {result ? <p>Result: <span style={{color: 'red'}}>{result}</span></p> : null }
            </div>
        </React.Fragment>
    );
}