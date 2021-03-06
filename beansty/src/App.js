import {Component} from 'react';
import './App.css';
import AppBody from './components/AppBody';

class App extends Component {  
  render () {
    return (
      <div id="app">
        <header id="header">
          Beansty
        </header>
        <div id="body">
          <div id="body-margined" className="full-height">
            <AppBody/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
