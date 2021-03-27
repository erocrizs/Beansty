import { Component } from 'react';
import CreateCard from './CreateCard';
import PassingGradeSlider from '../../common/PassingGradeSlider';
import './CreateDeck.css';

class CreateDeck extends Component {
  constructor (props) {
    super(props);

    let deck = props.deck || {};

    this.state = {
      id: deck.id || null,
      name: deck.name || '',
      description: deck.description || '',
      passing: (deck.passing * 100) || 50,
      cards: deck.cards || []
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
              value={this.state.name}
              onChange={e => this.updateName(e.target.value)}
              required
              />
            <label htmlFor="new-deck-desc" className="no-render">Description</label>
            <textarea
              id="new-deck-desc"
              name="description"
              form="create-deck-form"
              maxLength="128"
              placeholder="Description (128 Characters)"
              value={this.state.description}
              onChange={e => this.updateDescription(e.target.value)}
              />
            <PassingGradeSlider
              form="create-deck-form"
              passing={this.state.passing}
              label={'Passing Grade'}
              onUpdate={this.updatePassing.bind(this)}
              />
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
        <div id="new-card-absolute" onClick={this.addCardFromAbsoluteButton.bind(this)}/>
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

  updateName (name) {
    this.setState({name});
  }

  updateDescription (description) {
    this.setState({description});
  }

  updatePassing (passing) {
    this.setState({passing});
  }

  addCardFromAbsoluteButton (event) {
    this.addCard();
    event.preventDefault();
  }

  addCard () {
    this.setState(
      state => ({
        cards: [...state.cards, this.newCardTemplate()]
      })
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
    const cards = this.formatAllCards();
    this.props.onCreateDeck({
      id: this.state.id,
      name: this.state.name.trim(),
      description: this.state.description.trim(),
      passing: parseInt(this.state.passing)/100,
      cards
    });
    event.preventDefault();
  }

  formatAllCards () {
    const formattedList = [];

    for (let cardIndex in this.state.cards) {
      const card = this.state.cards[cardIndex];

      const formattedCard = {
        id: cardIndex,
        question: card.question,
        point: card.point,
        type: card.type
      };

      if (card.type === 'radio' || card.type === 'checkbox') {
        let lastIndex = -1;
  
        const newIndexMap = {};
        const newOptions = {};
        for (let i in card.options) {
          lastIndex++;
          newIndexMap[i] = lastIndex;
          newOptions[lastIndex] = card.options[i]; 
        }
        
        if (card.type === 'radio') {
          formattedCard.answer = newIndexMap[card.answer];
        }
        else if (card.type === 'checkbox') {
          formattedCard.answer = card.answer.map(e => newIndexMap[e]);
        }
  
        formattedCard.options = newOptions;
      }
      else if (card.type === 'list') {
        formattedCard.order = !!card.order;
        formattedCard.answer = card.answer;
      }
      else {
        formattedCard.answer = card.answer;
      }

      formattedList.push(formattedCard);
    }

    return formattedList;
  }

  triggerCancel (event) {
    this.props.onCreateCancel();
    event.preventDefault();
  }
}

export default CreateDeck;