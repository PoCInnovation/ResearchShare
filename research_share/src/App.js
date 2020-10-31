import React from 'react';
import Button from '@material-ui/core/Button';
import ipfsClient from 'ipfs-http-client';
import './App.css';

const ipfs = ipfsClient(
  {
    host : 'ipfs.infura.io',
    port : 5001,
    protocol : 'https'
  }
);

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
      setData(buffer.toString());
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
  }
  const handleClick = (event) => {
    UploadToIpfs(data);
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
    // do something to get the object with the hash
    //const result = ipfs.get({path : {hash}});
    //console.log(result);
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
