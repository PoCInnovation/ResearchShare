import React from 'react';
import ipfsClient from 'ipfs-http-client';

import { UploadButton } from './submit_paper/ButtonUpload';
import { DownloadButton } from './download_paper/ButtonDownload';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    ipfs_handling: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'black',
    },
    margins: {
        margin: '5% 5% 5% 5%'
    }
}));

const ipfs = ipfsClient({
    host : 'ipfs.infura.io',
    port : 5001,
    protocol : 'https'
});

export function IpfsHandling() {
    const classes = useStyles();

    return (
        <div className={classes.ipfs_handling}>
            <div className={classes.margins}>
                <h2>Research Paper</h2>
                <UploadButton ipfs={ipfs}/>
                <br/><br/>
                <DownloadButton ipfs={ipfs}/>
            </div>
        </div>
    );
}