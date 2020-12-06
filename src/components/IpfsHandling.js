import React from 'react';
import '../css/IpfsHandling.css';
import ipfsClient from 'ipfs-http-client';

import { UploadButton } from './ButtonUpload';
import { DownloadButton } from './ButtonDownload';

const ipfs = ipfsClient(
    {
      host : 'ipfs.infura.io',
      port : 5001,
      protocol : 'https'
    }
);

export function IpfsHandling() {
    return (
      <div id="IpfsHandling">
        <UploadButton ipfs={ipfs}/>
        <br/>
        <DownloadButton ipfs={ipfs}/>
      </div>
    );
}