import { Component } from 'react';
import DeckBox from './DeckBox';
import './ListDeck.css';

class ListDeck extends Component {
  render () {
    return (
      <div id="list-deck" className="full-height">
        {this.props.decks.map(this.renderDeck)}
        <div className="deck-container add-new-deck" onClick={() => console.log("here")}>
          Add new
        </div>
        <div id="new-deck-absolute"></div>
      </div>
    )
  }

  renderDeck (deck) {
    return (
      <div key={deck.id} className="deck-container">
        <DeckBox deck={deck}/>
      </div>
    );
  }
}

export default ListDeck;