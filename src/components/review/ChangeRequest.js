import React from 'react';

import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    change_requests_page: {
        width: '10%', float: 'left', marginLeft: '5%', maxWidth: '60px'
    },
    change_requests_line: {
        width: '10%', float: 'left', marginLeft: '1%', maxWidth: '60px'
    },
    change_requests_content: {
        marginTop: '5%', marginLeft: '5%', marginRight: '5%'
    }
}));

export function ChangeRequest({changeRequests, setChangeRequests, value, index}) {
    const classes = useStyles();

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

    return (
        <div id='ChangeRequestContent'>
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
        </div>
    );
}
