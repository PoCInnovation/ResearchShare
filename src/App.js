import React from 'react';
import './css/App.css';

import { ContractConcat } from './components/contracts/MetamaskConnect';
import { IpfsHandling } from './components/IpfsHandling';

function App() {
    return (
        <div className="App">
            <h1>Research Share</h1>
            <ContractConcat/>
            <IpfsHandling/>
        </div>
    );
}

export default App;