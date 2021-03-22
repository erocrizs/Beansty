import { Component } from 'react';
import './DeckBox.css';

class DeckBox extends Component {
  render () {
    return (
      <div className="deck-box">
        <div className="deck-box-detail">
          <div className="deck-box-name">{this.props.deck.name}</div>
          <div className="deck-box-description">{this.shortenedDescription()}</div>
        </div>
        <div className="deck-box-actions">
          <button className="deck-box-delete"
            onClick={this.delete.bind(this)}>
            Delete
          </button>
          <div>
            <button className="deck-box-edit"
              onClick={this.edit.bind(this)}>
              Edit
            </button>
            <button className="deck-box-play"
              onClick={this.play.bind(this)}>
              Play
            </button>
          </div>
        </div>
      </div>
    )
  }

  shortenedDescription () {
    const perWord = this.props.deck.description.split(' ');

    let short = '';
    const remainingLength = () => (61 - short.length);
    while (
      perWord.length > 0 
      && perWord[0].length + 1 < remainingLength()
    ) {
      if (short.length > 0) {
        short += ' ';
      }
      
      short += perWord.splice(0, 1);
    }

    if (perWord.length > 0) {
      const wordCutOff = 3;

      // next word > remainingLength > wordCutoff
      if (remainingLength() > wordCutOff + 1) {
        if (short.length > 0) {
          short += ' ';
        }

        short += perWord[0].substring(0, remainingLength());
      }

      short += '...';
    }

    return short;
  }

  delete () {
    this.props.onDelete();
  }

  edit () {
    this.props.onEdit();
  }

  play () {
    this.props.onPlay();
  }
}

export default DeckBox;