import React from 'react';
import './App.css';

import { MetamaskHandling } from '../components/metamask/MetamaskConnect';
import { IpfsHandling } from '../components/IpfsHandling';
import { Review } from '../components/review/Review';

function App() {
    return (
        <div className="App">
            <h1>Research Share</h1>
            <div id="wrapper">
                <div className="left"><MetamaskHandling/></div>
                <div className="center"><IpfsHandling/><br/><Review/></div>
                <div className="right"></div>
            </div>
        </div>
    );
}

export default App;