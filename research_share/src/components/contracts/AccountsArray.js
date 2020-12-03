import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

import PulseLoader from 'react-spinners/PulseLoader';

import { truncate } from '../../Utils.js';

const useStyles = makeStyles((theme) => ({
    title: {
        display: 'inline-block',
        position: 'relative',
    },
    title2: {
        display: 'inline-block',
        position: 'relative',
        marginLeft: '62px'
    },
}));

//TODO put all the elements in the array and not only the first
export function AccountsArray({isLoaderLoading, addresses, balances})
{
    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Typography variant="h6" style={{margin: '4, 0, 2'}}>
                    <div className={isLoaderLoading ? classes.title2 : classes.title}>
                        Accounts
                    </div>
                    <div style={{display: 'inline-block', position: 'relative', float: 'right', marginRight: '20px'}}>
                        <PulseLoader
                            css={isLoaderLoading ? {display: 'block'} : {display: 'none'}}
                            size={10}
                            color={"#123abc"}
                        />
                    </div>
                </Typography>
                <div style={{backgroundColor: "#cccccc"}}>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={truncate(addresses[0], 25)}
                                secondary={balances[0]}
                            />
                        </ListItem>
                    </List>
                </div>
            </Grid>
        </Grid>
    );
}