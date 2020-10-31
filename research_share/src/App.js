import React from 'react';
import Button from '@material-ui/core/Button';
import ipfsClient from 'ipfs-http-client';
import './App.css';

const ipfs = ipfsClient(
  {
    host : 'ipfs.infura.io/ipfs/',
    port : '5001',
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

function UploadToIpfsButton(props) {
  const UploadToIpfs = async (data) => {
      const results = await ipfs.add(data);
      //console.log('you need to upload the node here', {data});
  }
  const handleClick = (event) => {
    UploadToIpfs(props.data);
  }

  return (
    <div className="UploadToIpfsButton">
      <Button component="label" onClick={handleClick}>
        {'Upload To Ipfs'}
      </Button>
    </div>
  )
}

function App() {
  const [stringFile, setStringFile] = React.useState("");

  return (
    <div className="App">
      <UploadFileButton extractor={setStringFile}>
      </UploadFileButton>
      <UploadToIpfsButton data={stringFile}>
      </UploadToIpfsButton>
    </div>
  );
}

export default App;
