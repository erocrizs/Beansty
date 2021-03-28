import { Component } from 'react';
import PlayDeckCards from './PlayDeckCards';
import PlayDeckStart from './PlayDeckStart';
import './PlayDeck.css';

class PlayDeck extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
       subScreen: 'start',
       playstyle: 'quiz',
       passing: props.deck.passing * 100
    };
  }

  render() {
    return (
      <div id="play-deck">
        <button id="finish-play-button" onClick={() => this.props.onFinish()}>
          Done
        </button>
        <div id="play-deck-body">
          {this.renderSubScreen()}
        </div>
      </div>
    );
  }

  renderSubScreen () {
    switch (this.state.subScreen) {
      case 'play':
        return (
          <PlayDeckCards
            name={this.props.deck.name}
            cards={this.props.deck.start}
            passing={this.state.passing}
            playstyle={this.state.playstyle}
            onFinish={() => this.setState({subScreen: 'start'})}/>
        );
      default:
      case 'start':
        return (
          <PlayDeckStart
            name={this.props.deck.name}
            description={this.props.deck.description}
            cards={this.props.deck.cards}
            passing={this.state.passing}
            onStart={playstyle => this.setState({playstyle, subScreen: 'play'})}
            onUpdatePassing={passing => this.setState({passing})}/>
        );
    }
  }
}

export default PlayDeck;
