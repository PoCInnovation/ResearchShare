import React from 'react';
import ipfsClient from 'ipfs-http-client';

import './style/App.css';

import { UploadButton } from './components/ButtonUpload';
import { DownloadButton } from './components/ButtonDownload';
import { ContractConcat } from './components/contracts/concat/ContractConcat';

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
                <ContractConcat/>
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