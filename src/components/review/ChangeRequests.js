import React from 'react';

import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

import { connectToMetamask } from '../../utils/Utils';
import { ChangeRequest } from './ChangeRequest';

import { submitReview } from '../../contracts/wrappers/reviews';

const rs_contract = require('../../contracts/compiledContract.json').contracts["researchShare.sol"].ResearchShare;

const useStyles = makeStyles((theme) => ({
    deleteChangeRequest: {
        float: 'right'
    },
    wrappers: {
        display: 'flex',
        justifyContent: 'space-between',
        overflowWrap: 'break-word',
    },
    right: {
        width: '20%',
        float: 'right',
    },
    left: {
        width: '20%',
        float: 'left'
    },
    change_request: {
        backgroundColor: '#dddddd'
    }
}));

async function loadContract(address, setContract) {
    const contract = await new window.web3.eth.Contract(rs_contract.abi, address);
    await setContract(contract);
}

/**
 * Component function that is responsible of all changes requests of a review
 * @param {object, functionn, number, number} param0
 */
export function ChangeRequests({hash, reviewStatus}) {
    const [currentAccount, setCurrentAccount] = React.useState(null);
    const [changeRequests, setChangeRequests] = React.useState(null);
    const [contract, setContract] = React.useState(null);

    const classes = useStyles();

    React.useEffect(() => {
        loadContract(process.env.REACT_APP_CONTRACT_ADDRESS, setContract);
    }, []);
    React.useEffect(() => connectToMetamask(window, setCurrentAccount), []);

    const handleClickDeleteChangeRequest = (e, index) => {
        let newArr = [...changeRequests];

        newArr.splice(index, 1);
        setChangeRequests(newArr.length === 0 ? null : newArr);
    }
    const handleClickAddChangeRequest = (e) => {
        let newArr;
        if (changeRequests) {
            newArr = [...changeRequests];
            newArr.push({comment: '', page: '', line: ''});
        } else {
            newArr = [{comment: '', page: '', line: ''}];
        }
        setChangeRequests(newArr)
    }
    const handleClickDone = (e) => {
        submitReview(currentAccount, contract, hash, reviewStatus, changeRequests);
    }

    return (
        <div>
            { changeRequests ? changeRequests.map((value , index) => {
                return (
                    <div key={index} className={classes.change_request}>
                        <Button className={classes.deleteChangeRequest}
                            onClick={(e) => {handleClickDeleteChangeRequest(e, index)}}>
                            <ClearIcon/>
                        </Button>
                        <br/>
                        <ChangeRequest
                            changeRequests={changeRequests}
                            setChangeRequests={setChangeRequests}
                            value={value}
                            index={index}
                        />
                        <p><br/></p>
                    </div>
                )
            }) : <p>No change requests</p> }
            <div style={{marginRight: '5%', marginLeft: '5%'}}>
                <div className={classes.wrapper}>
                    <span className={classes.left}><p></p></span>
                    <Button
                        variant='outlined'
                        onClick={handleClickAddChangeRequest}
                    >
                        Add Change Request
                    </Button>
                    <Button
                        className={classes.right}
                        onClick={handleClickDone}
                        variant='contained'
                        color='primary'
                    >
                        Done
                    </Button>
                </div>
            </div>
        </div>
    );
}