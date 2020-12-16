import React from 'react';
import Button from '@material-ui/core/Button';
import '../css/ButtonDownload.css';

const all = require('it-all')
const concat = require('it-concat')

/**
 * Download the content of a file from IPFS via the client & hash, then extract it via the setter.
 * @param ipfs - IPFS Client.
 * @param hash {string} - Hash of a file on IPFS.
 * @param setContent - Setter from `React.useState` to retrieve the content of the file.
 * @returns {Promise<void>}
 */
async function downloadFromIPFS(ipfs, hash, setContent) {
    const result = await all(ipfs.get(hash));
    const file_content = await concat(result[0].content);
    setContent(file_content.toString());
}

/**
 *  Component Function used to retrieve a file from IPFS based on user's input.
 *  Test hash: QmPKby2sr2fxeEpxeGVuevGsvSVd1Hs37JBR9QSuWrvzuV -- my_world file from Alex & Theo
 * @param ipfs - IPFS Client.
 * @returns {JSX.Element}
 * @constructor
 */
export function DownloadButton({ipfs}) {
    // TODO: Provide way to download by filename
    //       Back: Call smart contract to get hash by filename
    //       Font: Provide way to input either hash or filename
    //             || Find way to differentiate filename & hash base on input
    const [hash, setHash] = React.useState("");
    const [content, setContent] = React.useState("");

    const inputOnChange = (event) => setHash(event.target.value);
    const buttonOnClick = async () => {
        // TODO: add error handling if hash empty
        await downloadFromIPFS(ipfs, hash, setContent);
    };

    return (
        <div>
            <div id="download">
                <input id="download_input" onChange={inputOnChange} type="text" name="HashField"/>
                <Button id="download_button" onClick={buttonOnClick} variant="contained" color="primary">
                    Download
                </Button>
            </div>
            { content ?
                <div className="FileContent">
                    <br/><br/><h2>File Content: </h2><br/>
                    {content}
                </div>
            : null }
        </div>
    );
}
