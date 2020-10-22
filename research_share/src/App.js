import React from 'react';
import Button from '@material-ui/core/Button';
import './App.css';

function App() {
  function handleClick(e) {
    console.log('Hello !');
  }

  return (
    <div className="App">
      <Button onClick={handleClick}>
        Upload
      </Button>
    </div>
  );
}

export default App;
