import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import { statusStrings } from '../../contracts/wrappers/reviews';
import { makeStyles } from '@material-ui/core/styles';

import { ChangeRequests } from './ChangeRequests';

const useStyles = makeStyles((theme) => ({
    select_status: {
        width: '30%',
        order: -1,
    },
    title: {
        textAlign: 'center',
    },
    hash: {
        width: '30%',
        marginTop: '1%'
    },
    title_plus_status: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center', // eslint-disable-next-line
        justifyContent: 'space-around',
        marginLeft: '5%',
        marginRight: '5%'
    },
    review: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'black',
    },
    margins: {
        margin: '5% 5% 5% 5%'
    }
}));

/**
 * Component function that is reponsible of reviews
 */
export function Review() {
    const [reviewStatus, setReviewStatus] = React.useState('Refuse');
    const [hash, setHash] = React.useState('');

    const classes = useStyles();

    const handleChangeSelectStatus = (e) => setReviewStatus(e.target.value);

    const handleChange = (e) => {
        setHash(e.target.value);
    }

    return (
        <div className={classes.review}>
            <div className={classes.margins}>
                <div className={classes.title}>
                    <h2>Review</h2>
                </div>
                <div className={classes.title_plus_status}>
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
                    <div className={classes.hash}>
                        <TextField id="standard-basic" label="Hash" value={hash} onChange={handleChange}/>
                    </div>
                </div>
                <br/><ChangeRequests hash={hash} reviewStatus={reviewStatus}/>
            </div>
        </div>
    );
}