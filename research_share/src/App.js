import React from 'react';
import Button from '@material-ui/core/Button';
import './App.css';

function UploadButton({extractor}) {
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

function UploadToIpfs(props) {
  // your string is  props.stringFile
  //connect to ipfs node

  //upload the string to it

  //end the function

  return <div></div>
}

function App() {
  const [stringFile, setStringFile] = React.useState("");

  return (
    <div className="App">
      <UploadButton extractor={setStringFile}>
      </UploadButton>
      <UploadToIpfs>
      </UploadToIpfs>
    </div>
  );
}

export default App;
