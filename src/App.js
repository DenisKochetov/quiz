import React from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';
import Quiz from './Quiz'

function App() {
  return (
    <div className="App">
      <Quiz></Quiz>
      
    </div>
  );
}

export default App;
const rootElement = document.getElementById('root')
ReactDOM.render(<App></App>, rootElement)
