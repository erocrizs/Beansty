import { Component } from 'react';

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
      <div id="create-deck">
        <div id="create-deck-details">
          <label htmlFor="new-deck-title" className="no-render">Deck Name</label>
          <textarea
            id="new-deck-name"
            name="name"
            form="create-deck-form"
            maxLength="32"
            placeholder="Deck Name"
            required
            />
          <label htmlFor="new-deck-desc" className="no-render">Description</label>
          <textarea
            id="new-deck-desc"
            name="description"
            form="create-deck-form"
            maxLength="128"
            placeholder="Description"
            />
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
          <form id="create-deck-form" onSubmit={this.triggerCreate.bind(this)}/>
        </div>
        <div>
          <button
            id="create-new-deck-button"
            type="submit"
            form="create-deck-form">
            Create New Button
          </button>
        </div>
      </div>
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
}

export default CreateDeck;