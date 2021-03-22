import { Component } from 'react';
import DeckBox from './DeckBox';
import './ListDeck.css';

class ListDeck extends Component {
  render () {
    return (
      <div id="list-deck" className="full-height">
        {this.props.decks.map(this.renderDeck.bind(this))}
        <div className="deck-container add-new-deck"
          onClick={e => this.triggerCreateNew(e)}>
          Add New Deck
        </div>
        <div id="new-deck-absolute"
          onClick={e => this.triggerCreateNew(e)}/>
      </div>
    )
  }

  renderDeck (deck) {
    return (
      <div key={deck.id} className="deck-container">
        <DeckBox
          deck={deck}
          onDelete={() => this.props.onDelete(deck.id)}
          onEdit={() => this.props.onEdit(deck.id)}
          onPlay={() => this.props.onPlay(deck.id)}/>
      </div>
    );
  }

  triggerCreateNew (event) {
    this.props.onCreateNew();
    event.preventDefault();
  }
}

export default ListDeck;