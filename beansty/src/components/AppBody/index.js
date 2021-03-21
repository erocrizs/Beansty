import { Component } from 'react';
import './AppBody.css';
import CreateDeck from './CreateDeck';
import ListDeck from './ListDeck';
import mockdeck from '../../library/mockdeck';

class AppBody extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      screen: 'list',
      decks: mockdeck
    };
  }
  
  setScreen (screen) {
    this.setState({
      ...this.state,
      screen
    });
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
      case 'new_deck':
        return (
          <CreateDeck
            onCreateDeck={this.createNewDeck.bind(this)}
            onCreateCancel={() => this.setScreen('list')}/>
        );
      case 'list':
      default:
        return (
          <ListDeck
            decks={this.state.decks}
            onCreateNew={() => this.setScreen('new_deck')}/>
        );
    }
  }

  createNewDeck (deck) {
    deck.id = this.getNewDeckID()
    this.setState(
      {
        ...this.state,
        decks: [...this.state.decks, deck]
      },
      () => {
        this.setScreen('list');
      }
    );
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
}

export default AppBody;