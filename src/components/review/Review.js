import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { statusStrings } from '../../contracts/wrappers/reviews';
import { makeStyles } from '@material-ui/core/styles';

import "./Review.css";

const useStyles = makeStyles((theme) => ({
    select_status: {
    },
    change_requests_page: {
        width: '10%', float: 'left', marginLeft: '5%', maxWidth: '60px'
    },
    change_requests_line: {
        width: '10%', float: 'left', marginLeft: '1%', maxWidth: '60px'
    },
    change_requests_content: {
        marginTop: '5%', marginLeft: '5%', marginRight: '5%'
    },
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
    }

}));

export function Review() {
    const [reviewStatus, setReviewStatus] = React.useState('Refuse');
    const [changeRequests, setChangeRequests] = React.useState(null);

    const classes = useStyles();

    const handleChangeSelectStatus = (e) => setReviewStatus(e.target.value);
    const handleChangeChangeRequestContent = (e, index) => {
        let newArr = [...changeRequests];

        newArr[index] = {...newArr[index], content: e.target.value};
        setChangeRequests(newArr);
    }
    const handleChangeChangeRequestPage = (e, index) => {
        let newArr = [...changeRequests];

        newArr[index] = {...newArr[index], page: e.target.value};
        setChangeRequests(newArr);
    }
    const handleChangeChangeRequestLine = (e, index) => {
        let newArr = [...changeRequests];

        newArr[index] = {...newArr[index], line: e.target.value};
        setChangeRequests(newArr);
    }
    const handleClickDeleteChangeRequest = (e, index) => {
        let newArr = [...changeRequests];

        newArr.splice(index, 1);
        setChangeRequests(newArr.length == 0 ? null : newArr);
    }
    const handleClickAddChangeRequest = (e) => {
        let newArr;
        if (changeRequests) {
            newArr = [...changeRequests];
            newArr.push({content: undefined, line: undefined, page: undefined});
        } else {
            newArr = [{content: undefined, line: undefined, page: undefined}];
        }
        setChangeRequests(newArr)
    }

    return (
        <div id="review">
            <h2>Review</h2>
            <div className={classes.select_status}>
                <FormControl variant="filled">
                    <InputLabel style={{marginLeft: '-7.5%'}}>Status</InputLabel><br/>
                    <NativeSelect id="review_status" value={reviewStatus} onChange={handleChangeSelectStatus}>
                        { statusStrings.map((value , index) => {
                            return (<option value={value} key={index}>{value}</option>)
                        })}
                    </NativeSelect>
                </FormControl>
            </div><br/>
            {/*<ChangeRequest></ChangeRequest>*/}
            <div id="change_requests">
                    { changeRequests ? changeRequests.map((value , index) => {
                        return (
                            <div key={index} id="change_request">
                                <Button className={classes.deleteChangeRequest}
                                    onClick={(e) => {handleClickDeleteChangeRequest(e, index)}}>
                                    <ClearIcon/>
                                </Button>
                                <br/>
                                <div>
                                    <TextField
                                        className={classes.change_requests_page}
                                        label="Page"
                                        variant="filled"
                                        value={value.page}
                                        onChange={(e) => handleChangeChangeRequestPage(e, index)}
                                    />
                                    <TextField
                                        className={classes.change_requests_line}
                                        label="Line"
                                        variant="filled"
                                        value={value.line}
                                        onChange={(e) => handleChangeChangeRequestLine(e, index)}
                                    />
                                </div><br/><br/>
                                <div className={classes.change_requests_content}>
                                    <TextField                                
                                        label="Comments"
                                        placeholder="Enter Change Request Comments "
                                        multiline
                                        fullWidth
                                        variant="filled"
                                        value={value.content}
                                        onChange={(e) => handleChangeChangeRequestContent(e, index)}
                                    />
                                </div>
                                <p><br/></p>
                            </div>
                        )
                    }) : <p>No change requests</p> }
                    <div style={{marginRight: '5%', marginLeft: '5%'}}>
                        <div className={classes.wrapper}>
                            <span className={classes.left}><p></p></span>
                            <Button variant='outlined' onClick={handleClickAddChangeRequest}>Add Change Request</Button>
                            <Button className={classes.right} variant='contained' color='primary'>Done</Button>
                        </div>
                    </div>
            </div>

        </div>
    );
}
