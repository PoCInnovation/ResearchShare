import React from 'react';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import { statusStrings } from '../../contracts/wrappers/reviews';
import { makeStyles } from '@material-ui/core/styles';

import "./Review.css";
import { ChangeRequests } from './ChangeRequests';

const useStyles = makeStyles((theme) => ({
    select_status: {
    },
}));

export function Review() {
    const [reviewStatus, setReviewStatus] = React.useState('Refuse');

    const classes = useStyles();

    const handleChangeSelectStatus = (e) => setReviewStatus(e.target.value);

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
            <ChangeRequests/>
        </div>
    );
}
