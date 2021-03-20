import { Component } from 'react';
import './DeckBox.css';

class DeckBox extends Component {
  render () {
    return (
      <div>
        <div>{this.props.deck.name}</div>
        <div>{this.props.deck.description}</div>
      </div>
    )
  }
}

export default DeckBox;