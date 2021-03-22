import { Component } from 'react';
import './AppBody.css';
import CreateDeck from './CreateDeck';
import ListDeck from './ListDeck';
import deckStore from '../../library/deck';

class AppBody extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      screen: 'list',
      editDeck: null,
      decks: deckStore.fetch()
    };
  }
  
  setScreen (screen) {
    this.setState({screen});
  }

  render () {
    return (
      <div id="app-body" className="full-height">
        {this.renderCurrentScreen()}
      </div>
    )
  }

  renderCurrentScreen () {
    switch (this.state.screen) {
      case 'edit':
        return (
          <CreateDeck
            deck={this.state.editDeck || null}
            onCreateDeck={this.finishEditDeck.bind(this)}
            onCreateCancel={this.cancelEditDeck.bind(this)}/>
        );
      case 'list':
      default:
        return (
          <ListDeck
            decks={this.state.decks}
            onCreateNew={this.createNewDeck.bind(this)}
            onEdit={this.editDeck.bind(this)}
            onDelete={this.deleteDeck.bind(this)}
            onPlay={this.playDeck.bind(this)}/>
        );
    }
  }

  createNewDeck () {
    this.setState({
      editDeck: null,
      screen: 'edit'
    });
  }

  editDeck (deckID) {
    let editDeck = null;
    for (let i in this.state.decks) {
      if (this.state.decks[i].id === deckID) {
        editDeck = this.state.decks[i];
      }
    }

    if (editDeck) {
      this.setState({
        editDeck,
        screen: 'edit'
      });
    }
  }

  playDeck (deckID) {
    // TODO
    alert('playing ' + deckID);
  }

  cancelEditDeck () {
    this.setState({
      editDeck: null,
      screen: 'list'
    });
  }

  finishEditDeck (deck) {
    const currentDecks = this.state.decks;

    if (deck.id === null) {
      deck.id = this.getNewDeckID();
      currentDecks.push(deck);
    }
    else {
      for (let d of currentDecks) {
        if (d.id === deck.id) {
          d.name = deck.name;
          d.description = deck.description;
          d.passing = deck.passing;
          d.cards = deck.cards;
          break;
        }
      }
    }

    deckStore.store(currentDecks);
    this.setState({
      decks: currentDecks,
      screen: 'list' 
    });
  }
  
  getNewDeckID () {
    let maxID = 0;

    for (let {id} of this.state.decks) {
      if (id > maxID) {
        maxID = id;
      }
    }

    return maxID + 1;
  }

  deleteDeck (deckID) {
    let toDelete = -1;
    for (let i in this.state.decks) {
      if (this.state.decks[i].id === deckID) {
        toDelete = i;
        break;
      }
    }

    if (toDelete >= 0) {
      this.state.decks.splice(toDelete, 1);
      deckStore.store(this.state.decks);
      this.setState({
        decks: this.state.decks
      });
    }
  }
}

export default AppBody;