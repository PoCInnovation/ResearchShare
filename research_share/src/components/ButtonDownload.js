import React from 'react';
import Button from '@material-ui/core/Button';
import '../style/App.css';

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
 * Component Function which create a basic download button with a text input.
 * It's used by {@link DownloadButton}.
 * @param inputOnChange {callback} - Function to be called when a file is selected via the input.
 * @param buttonOnClick {callback} - Function to be called when the button is pressed.
 * @returns {JSX.Element}
 */
function  downloadButtonBase({inputOnChange, buttonOnClick})  {
    return (
        <div id="download" className={"DownloadButtonBase"}>
            <input id="download_input" type="text" name="HashField" onChange={inputOnChange}/>
            <Button id="download_button" variant="contained" color="primary"
                    onClick={buttonOnClick}>
                Download
            </Button>
        </div>
    );
}

/**
 * Component Function which adds content downloaded to a base button.
 * It's used by {@link DownloadButton}.
 * @param base {JSX.Element} - Basic download button.
 * @param content {string} - Content of the file, obtained via the its download
 * @returns {JSX.Element}
 */
function downloadButtonWithContent({base, content}) {
    return (
        <div className={"DownloadButtonWithContent"}>
            {base}
            <br/>
            <div className={"FileContent"}>{content}</div>
        </div>
    )
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
    const inputOnChange = (event) => setHash(event.target.value);

    const [content, setContent] = React.useState("");
    const buttonOnClick = async () => {
        // TODO: add error handling if hash empty
        await downloadFromIPFS(ipfs, hash, setContent);
    };

    const base = downloadButtonBase({inputOnChange, buttonOnClick});
    return !content ? base : downloadButtonWithContent({base, content});
}
