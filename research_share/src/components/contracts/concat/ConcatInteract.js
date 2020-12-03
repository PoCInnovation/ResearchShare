import React  from 'react';

import Button from '@material-ui/core/Button';

function setFirstString(event) {
    //TODO
}

function setSecondString(event) {
    //TODO
}

function computeResult(event) {
    //TODO
}

/*
<input type="text" placeholder='String' style={{float: 'left', width: '120px', marginLeft: '10px'}}/>
<Button color="primary" variant="contained" style={{float: 'right', width: '120px', height: '20px', marginRight: '10px'}}>
*/
export function ConcatInteract() {
    return (
        <React.Fragment>
            <div className="setFirstString">
                <input type="text" placeholder='String'/>
                <Button color="primary" variant="contained" onClick={setFirstString}>
                    setFirstString
                </Button>
            </div>
            <div className="setSecondString">
                <input type='text' placeholder='String' onClick={setSecondString}/>
                <Button color="primary" variant="contained">
                    setSecondString
                </Button>
            </div>
        </React.Fragment>
    );
}