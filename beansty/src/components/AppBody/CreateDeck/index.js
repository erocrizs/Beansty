import { Component } from 'react';
import CreateCard from './CreateCard';
import './CreateDeck.css';

class CreateDeck extends Component {
  constructor () {
    super();
    this.state = {
      passing: 50,
      cards: []
    };
  }

  render() {
    return (
      <div id="create-deck-container" className="full-height">
        <div id="create-deck-finish">
          <button
            id="create-new-deck-cancel"
            type="reset"
            form="create-deck-form">
            Back
          </button>
          <button
            id="create-new-deck-button"
            type="submit"
            form="create-deck-form">
            Finish Deck
          </button>
        </div>
        <div id="create-deck" className="full-height">
          <div id="create-deck-details">
            <label htmlFor="new-deck-title" className="no-render">Deck Name</label>
            <input
              id="new-deck-name"
              type="text"
              name="name"
              form="create-deck-form"
              maxLength="32"
              placeholder="Deck Name (32 Characters)"
              required
              />
            <label htmlFor="new-deck-desc" className="no-render">Description</label>
            <textarea
              id="new-deck-desc"
              name="description"
              form="create-deck-form"
              maxLength="128"
              placeholder="Description (128 Characters)"
              />
            <div id="new-deck-passing-block">
              <label htmlFor="new-deck-passing" className="no-render">Passing Grade</label>
              <input
                type="range"
                name="passing"
                id="new-deck-passing"
                form="create-deck-form"
                min="0"
                max="100"
                step="1"
                value={this.state.passing}
                onChange={this.updatePassing.bind(this)}
                />
              <input
                type="number"
                name="passing"
                id="new-deck-passing-text"
                min="0"
                max="100"
                step="1"
                value={this.state.passing}
                onChange={this.updatePassing.bind(this)}
                required
                />
            </div>
            <form id="create-deck-form"
              onSubmit={this.triggerCreate.bind(this)}
              onReset={this.triggerCancel.bind(this)}/>
          </div>
          <div id="card-list">
            {this.renderCards()}
            <div id="add-new-card" onClick={() => this.addCard()}>
              Add Card
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderCards () {
    return this.state.cards.map(
      card => (
        <div key={card.id} className="create-card-container">
          <CreateCard 
            card={card}
            onUpdate={(prop, value) => this.updateCard(card.id, prop, value)}
            onDelete={() => this.deleteCard(card.id)}/>
        </div>
      )
    );
  }

  updatePassing (event) {
    const newValue = event.target.value;
    if (newValue === '' || newValue === '100' || newValue.match(/^\d?\d$/)) {
      this.setState({
        ...this.state,
        passing: event.target.value
      });
    }
  }

  addCard () {
    this.setState(
      {
        ...this.state,
        cards: [...this.state.cards, this.newCardTemplate()]
      }
    );
  }

  updateCard (id, prop, value) {
    for (let card of this.state.cards) {
      if (card.id === id) {
        if (prop === 'point' && !value.match(/^\d+(\.\d*)?$/)) {
          break;
        }

        if (value === undefined) {
          delete card[prop];
        }
        else {
          card[prop] = value;
        }
        
        break;
      }
    }

    return new Promise(
      (resolve, reject) => this.setState(
        {
          ...this.state,
          cards: [...this.state.cards]
        },
        err => err ? reject(err) : resolve()
      )
    );
  }

  deleteCard (cardId) {
    let indexToDelete = -1;
    for (let i in this.state.cards) {
      if (this.state.cards[i].id === cardId) {
        indexToDelete = i;
      }
    }

    if (indexToDelete >= 0) {
      this.state.cards.splice(indexToDelete, 1);
    }

    this.setState({
      ...this.state,
      cards: [...this.state.cards]
    });
  }

  newCardTemplate () {
    return {
      id: this.getNewCardID(),
      question: '',
      type: null,
      order: false,
      point: 1
    };
  }

  getNewCardID () {
    let maxID = 0;

    for (let {id} of this.state.cards) {
      if (id > maxID) {
        maxID = id;
      }
    }

    return maxID + 1;
  }

  triggerCreate (event) {
    const deck = {};

    for (let {name, value} of event.target.elements) {
      if (['name', 'description'].includes(name)) {
        // texts
        deck[name] = value.trim();
      }
      else if (['passing'].includes(name)) {
        // numbers
        deck[name] = +(value.trim());
      }
    }

    deck.passing = deck.passing / 100;
    deck.cards = this.state.cards;

    this.props.onCreateDeck(deck);
    event.preventDefault();
  }

  triggerCancel (event) {
    this.props.onCreateCancel();
    event.preventDefault();
  }
}

export default CreateDeck;