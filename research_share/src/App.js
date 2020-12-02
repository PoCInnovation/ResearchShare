import React from 'react';
import ipfsClient from 'ipfs-http-client';

import './App.css';

import {UploadButton} from './ButtonUpload';
import {DownloadButton} from './ButtonDownload';
import {SmartContractAdd} from './contracts/SmartContractAdd';

const ipfs = ipfsClient(
  {
    host : 'ipfs.infura.io',
    port : 5001,
    protocol : 'https'
  }
);

function App() {
    return (
        <div className="App">
            <h1>Research Share</h1>
            <div>
              <div style={{display: 'inline-block', position: 'relative', float: 'left', width: '20%'}}>
                <SmartContractAdd/>
              </div>
              <div style={{display: 'inline-block', position: 'relative', right: '10%'}}>
                <UploadButton ipfs={ipfs}/>
                <br/>
                <DownloadButton ipfs={ipfs}/>
              </div>
            </div>
        </div>
    );
}

export default App;