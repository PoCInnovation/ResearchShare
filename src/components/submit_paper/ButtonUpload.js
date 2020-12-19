import React from 'react';
import Button from '@material-ui/core/Button';
import './ButtonUpload.css';

/**
 * Upload the content of a file to IPFS via the client and save the file's hash.
 * @param ipfs - IPFS Client.
 * @param fileContent {string} - Content of the file to upload.
 * @param setFileHash - Setter from `React.useState` to retrieve the ipfs hash of the file.
 * @returns {Promise<void>}
 */
async function uploadToIPFS(ipfs, fileContent, setFileHash) {
    const result = await ipfs.add(fileContent);
    setFileHash(result.path);
}

/**
 * Invoke our SmartContract to save the hash & filename.
 * @param ipfsHash {string} - Hash retrieved during {@link uploadToIPFS}.
 * @param filename {string} - Name of the file corresponding to the hash.
 */
function callSmartContract(ipfsHash, filename) {
    // TODO: do stuff
}

/**
 * Extract the filename from a filepath.
 * @param filepath {string} - Source of the name.
 * @param setFilename - Setter from `React.useState` to retrieve the name of the file.
 */
function extractFilename(filepath, setFilename) {
    const result = /[^\\]*$/.exec(filepath)[0];
    setFilename(result);
}

/**
 * Creates a FileReader to read a file and use the setter to extract it.
 * @param file - File to retrieve the content from.
 * @param setFileContent - Setter from `React.useState` to retrieve the content of the file.
 */
function getFileContent(file, setFileContent) {
    let reader = new window.FileReader();
    reader.onload = (event) => setFileContent(event.target.result);
    reader.readAsText(file);
}

/**
 * Component Function used to retrieve a file from the user's machine & upload it to IPFS.
 * @param ipfs - IPFS Client.
 * @returns {JSX.Element}
 * @constructor
 */
export function UploadButton({ipfs}) {
    const [filename, setFilename] = React.useState("");
    const [fileContent, setFileContent] = React.useState("");
    const [fileHash, setFileHash] = React.useState("");

    const inputOnChange = (event) => {
        extractFilename(event.target.value, setFilename);
        getFileContent(event.target.files[0], setFileContent);
    };

    const buttonOnClick = async () => {
        // TODO: add error handling if fname & fcontent empty
        await uploadToIPFS(ipfs, fileContent, setFileHash);
        callSmartContract(fileHash, filename);
    };

    return (
        <div>
            <div id="upload">
                <input id="upload_input" onChange={inputOnChange} type="file"/>
                <Button id="upload_button" onClick={buttonOnClick} variant="contained" color="primary">
                    Upload
                </Button>
            </div>
            <br/>
            {fileHash ? <div id="success">{'Success: ' + fileHash}</div> : null}
        </div>
    );
}