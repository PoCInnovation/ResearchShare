import React from 'react';
import ipfsClient from 'ipfs-http-client';
import './App.css';
import {UploadButton} from './ButtonUpload';
import {DownloadButton} from './ButtonDownload';

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
            <UploadButton ipfs={ipfs}/>
            <br/>
            <DownloadButton ipfs={ipfs}/>
        </div>
    );
}

export default App;