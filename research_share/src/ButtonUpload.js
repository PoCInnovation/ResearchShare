import React from 'react';
import Button from '@material-ui/core/Button';

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
 * Component Function which create a basic upload button with a file input.
 * It's used by {@link UploadButton}.
 * @param inputOnChange {callback} - Function to be called when a file is selected via the input.
 * @param buttonOnClick {callback} - Function to be called when the button is pressed.
 * @returns {JSX.Element}
 */
function uploadButtonBase({inputOnChange, buttonOnClick}) {
    return (
        <div className={"UploadButtonBase"}>
            <input name={"GetFile"} type={"file"} onChange={inputOnChange}/>
            <Button name={"Upload"} onClick={buttonOnClick} variant={"outlined"} color={"primary"}>
                {'Upload'}
            </Button>
        </div>
    );
}

/**
 * Component Function which adds the status of the upload & the hash obtained to a base button.
 * It's used by {@link UploadButton}.
 * @param base {JSX.Element} - Basic upload button.
 * @param fileHash {string} - Hash of the file, obtained via its upload.
 * @returns {JSX.Element}
 */
function uploadButtonWitHash({base, fileHash}) {
    return (
        <div className={"UploadButtonWithHash"}>
            {base}
            <br/>
            <br/>
            {'Success: ' + fileHash}
        </div>
    )
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

    const inputOnChange = (event) => {
        extractFilename(event.target.value, setFilename);
        getFileContent(event.target.files[0], setFileContent);
    };

    const [fileHash, setFileHash] = React.useState("");
    const buttonOnClick = async () => {
        // TODO: add error handling if fname & fcontent empty
        await uploadToIPFS(ipfs, fileContent, setFileHash);
        callSmartContract(fileHash, filename);
    };

    const base = uploadButtonBase({inputOnChange, buttonOnClick});
    return !fileHash ? base : uploadButtonWitHash({base, fileHash});
}