import { Component } from 'react';
import PassingGradeSlider from '../../../common/PassingGradeSlider';
import './PlayDeckStart.css';

class PlayDeckStart extends Component {
  render() {
    return (
      <div id="play-deck-start-card">
        <div id="play-deck-start-name">
          {this.props.name}
        </div>
        <div id="play-deck-start-description">
          {this.props.description}
        </div>
        <PassingGradeSlider
          passing={this.props.passing}
          label={'Passing Grade'}
          onUpdate={this.updatePassing.bind(this)}/>
        <div id="play-buttons">
          <button id="play-flash-button"
            onClick={() => this.props.onStart('flash')}>
            Play Flash Card
          </button>
          <button id="play-quiz-button"
            onClick={() => this.props.onStart('quiz')}>
            Play Quiz
          </button>
        </div>
      </div>
    )
  }

  updatePassing (passing) {
    this.props.onUpdatePassing(passing);
  }


}

export default PlayDeckStart;