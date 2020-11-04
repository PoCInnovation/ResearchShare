import React from 'react';
import Button from '@material-ui/core/Button';
import ipfsClient from 'ipfs-http-client';
import './App.css';

const all = require('it-all')
const concat = require('it-concat')

const ipfs = ipfsClient(
  {
    host : 'ipfs.infura.io',
    port : 5001,
    protocol : 'https'
  }
);

// Pas compris pk mais l'extracteur sur data fait pas son taf
var content;

function UploadFileButton({extractor}) {
  const [data, setData] = React.useState(null);
  React.useEffect(() => extractor(data), [data, extractor]);

  const handleClick = (event) => {
    event.preventDefault();
    let reader = new window.FileReader();
    const files = event.target.files;

    reader.readAsArrayBuffer(files[0]);
    reader.onload = (ev) => {
      let buffer = new Buffer.from(reader.result);
      content = buffer.toString();
      // setData(buffer.toString());
    };
  }

  return (
    <div className="UploadButton">
      <Button component="label">
        <input type="file" name="Upload" style={{ display: "none" }} onChange={handleClick}>
        </input>
        {'Upload'}
      </Button>
    </div>
  )
}

function UploadToIpfsButton({extractor}, {data}) {
  const [hash, setHash] = React.useState(null);
  React.useEffect(() => extractor(hash), [hash, extractor]);

  const UploadToIpfs = async (data) => {
      const results = await ipfs.add(data);
      setHash(results.path);
      console.log(`Path : ${results.path}`);
  }
  const handleClick = (event) => {
    UploadToIpfs(content);
  }

  return (
    <div className="UploadToIpfsButton">
      <Button component="label" onClick={handleClick}>
        {'Upload To Ipfs'}
      </Button>
    </div>
  )
}

function DownloadButton({hash}) {
  const DownloadFromIpfs = async (hash) => {
    const result = await all(ipfs.get(hash));
    const file_content=await concat(result[0].content);
    console.log(`file content : ${file_content}`);
  }
  const handleClick = (event) => {
    DownloadFromIpfs(hash);
  }

  return (
    <div className="UploadToIpfsButton">
      <Button component="label" onClick={handleClick}>
        {'Download From Ipfs'}
      </Button>
    </div>
  )
}

function App() {
  const [stringFile, setStringFile] = React.useState("");
  const [nodeHash, setNodeHash] = React.useState("");

  return (
    <div className="App">
      <UploadFileButton extractor={setStringFile}>
      </UploadFileButton>
      <UploadToIpfsButton data={stringFile} extractor={setNodeHash}>
      </UploadToIpfsButton>
      <DownloadButton hash={nodeHash}>
      </DownloadButton>
    </div>
  );
}

export default App;
