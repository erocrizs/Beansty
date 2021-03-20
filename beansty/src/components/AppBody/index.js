import { Component } from 'react';
import './AppBody.css';
import ListDeck from './ListDeck';

class AppBody extends Component {
  render() {
    return (
      <div id="app-body">
        <ListDeck decks={this.props.decks}/>
      </div>
    )
  };
}

export default AppBody;