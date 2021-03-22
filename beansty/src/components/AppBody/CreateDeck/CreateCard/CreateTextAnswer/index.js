import  { Component } from 'react';
import './CreateTextAnswer.css';

class CreateTextAnswer extends Component {
  render() {
    return (
      <div className="create-text-answer">
        <div className="create-answer-label">
          Answer: 
        </div>
        <textarea
          className="create-text-answer-field"
          placeholder="Correct Answer (512 Characters)"
          maxLength="512"
          form="create-deck-form"
          onChange={e => {this.props.onAnswer({answer: e.target.value})}}
          required
          value={this.props.answer || ''}/>
      </div>
    );
  }
}

export default CreateTextAnswer;
