import { Component } from 'react';
import DeckBox from './DeckBox';
import './ListDeck.css';

class ListDeck extends Component {
  render () {
    return (
      <div id="list-deck">
        {this.props.decks.map(this.renderDeck)}
      </div>
    )
  }

  renderDeck (deck) {
    return (
      <div key={deck.id} className="deck">
        <DeckBox deck={deck}/>
      </div>
    );
  }
}

export default ListDeck;