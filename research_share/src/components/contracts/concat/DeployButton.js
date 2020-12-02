import React  from 'react';

import Button from '@material-ui/core/Button';

export function DeployButton({handleClick}) {

    return (
        <React.Fragment>
            <Button color="primary" variant="contained" onClick={handleClick}>
                Deploy Contract
            </Button>
            <br/>
        </React.Fragment>
    );
}