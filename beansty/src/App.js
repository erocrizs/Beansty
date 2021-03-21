import {Component} from 'react';
import mockdeck from './library/mockdeck';
import './App.css';
import AppBody from './components/AppBody';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      decks: mockdeck
    }
  }
  
  render () {
    return (
      <div id="app">
        <header id="header">
          Beansty
        </header>
        <div id="body">
          <div id="body-margined" className="full-height">
            <AppBody decks={this.state.decks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
