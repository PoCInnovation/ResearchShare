import React from 'react';
import ipfsClient from 'ipfs-http-client';

import { UploadButton } from './submit_paper/ButtonUpload';
import { DownloadButton } from './download_paper/ButtonDownload';

const ipfs = ipfsClient(
    {
      host : 'ipfs.infura.io',
      port : 5001,
      protocol : 'https'
    }
);

export function IpfsHandling() {
    return (
      <div id="ipfsHandling">
        <UploadButton ipfs={ipfs}/>
        <br/><br/>
        <DownloadButton ipfs={ipfs}/>
      </div>
    );
}