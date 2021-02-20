import React from 'react';

import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import { ChangeRequest } from './ChangeRequest';

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

export function ChangeRequests() {
    const [changeRequests, setChangeRequests] = React.useState(null);

    const classes = useStyles();

    const handleClickDeleteChangeRequest = (e, index) => {
        let newArr = [...changeRequests];

        newArr.splice(index, 1);
        setChangeRequests(newArr.length === 0 ? null : newArr);
    }
    const handleClickAddChangeRequest = (e) => {
        let newArr;
        if (changeRequests) {
            newArr = [...changeRequests];
            newArr.push({content: '', line: '', page: ''});
        } else {
            newArr = [{content: '', line: '', page: ''}];
        }
        setChangeRequests(newArr)
    }
    const handleClickDone = (e) => {
        alert('Done Clicked');
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