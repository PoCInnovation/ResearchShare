import React from 'react';
import Button from '@material-ui/core/Button';
import './ButtonUpload.css';

import Input from '@material-ui/core/Input';

import { connectToMetamask } from '../../utils/Utils';
import { submitPaper } from '../../contracts/wrappers/researchShare';

const rs_contract = require('../../contracts/compiledContract.json').contracts["researchShare.sol"].ResearchShare;

async function loadContract(address, setContract) {
    const contract = await new window.web3.eth.Contract(rs_contract.abi, address);
    await setContract(contract);
}

/**
 * Upload the content of a file to IPFS via the client and save the file's hash.
 * @param ipfs - IPFS Client.
 * @param fileContent {string} - Content of the file to upload.
 * @param setFileHash - Setter from `React.useState` to retrieve the ipfs hash of the file.
 * @returns {Promise<void>}
 */
async function uploadToIPFS(ipfs, fileContent, setFileHash) {
    const result = await ipfs.add(fileContent);
    await setFileHash(result.path);
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

function callSubmitPaper(account, contract, hash, field)
{
    if (!hash || !field) {
        return;
    }
    console.log('hash: ', hash, 'field: ', field);
    submitPaper(account, contract, hash, field);
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
    const [currentAccount, setCurrentAccount] = React.useState(null);
    const [contract, setContract] = React.useState(null);
    const [paperField, setPaperField] = React.useState(null);

    React.useEffect(() => {
        loadContract(process.env.REACT_APP_CONTRACT_ADDRESS, setContract);
    }, []);
    React.useEffect(() => connectToMetamask(window, setCurrentAccount), []); // eslint-disable-next-line
    React.useEffect(() => callSubmitPaper(currentAccount, contract, fileHash, paperField), [fileHash]);
    const inputOnChange = async (event) => {
        extractFilename(event.target.value, setFilename);
        getFileContent(event.target.files[0], setFileContent);
    };

    const buttonOnClick = async () => {
        if (!filename || !fileContent || !ipfs)
            return;
        await uploadToIPFS(ipfs, fileContent, setFileHash);
    };

    return (
        <div>
            <div id="upload">
                <Input placeholder='Field' onChange={(e) => setPaperField(e.target.value)} />
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