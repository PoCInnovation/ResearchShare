import React from 'react';
import './App.css';

import { MetamaskHandling } from '../components/metamask/MetamaskConnect';
import { IpfsHandling } from '../components/IpfsHandling';

function App() {
    return (
        <div className="App">
            <h1>Research Share</h1>
            <div id="wrapper">
                <div className="left"><MetamaskHandling/></div>
                <div className="center"><IpfsHandling/></div>
                <div className="right"></div>
            </div>
        </div>
    );
}

export default App;