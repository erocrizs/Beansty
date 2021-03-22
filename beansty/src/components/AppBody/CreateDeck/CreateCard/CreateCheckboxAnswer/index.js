import { Component } from 'react';
import './CreateCheckboxAnswer.css';

class CreateCheckboxAnswer extends Component {
  constructor(props) {
    super(props);
    
    let maxID = -1;
    this.answerMap = {};
    for (let index in this.props.options) {
      this.answerMap[index] = false;
      if (maxID < +index) {
        maxID = +index;
      }
    }
  
    this.lastOptionID = maxID;

    if (this.props.answer && this.props.answer.length) {
      for (let index of this.props.answer) {
        this.answerMap[index] = true;
      }
    }
  }

  render() {
    return (
      <div className="create-checkbox-answer">
        <div className="create-answer-label">
          Options (Mark all correct answers):
        </div>
        <div className="create-checkbox-answer-options">
          {this.renderOptions()}
          <button 
            className="create-checkbox-answer-options-add"
            onClick={this.addOption.bind(this)}>
            + Add Option
          </button>
        </div>
      </div>
    );
  }

  renderOptions () {
    const optionList = [];

    for (let index in this.props.options) {
      optionList.push({
        option: this.props.options[index],
        index: +index
      })
    }

    optionList.sort((a, b) => a.index - b.index);

    return optionList.map(
      ({option, index}) => (
        <div key={index} className="create-checkbox-answer-option">
          <input 
            type="checkbox"
            className="create-checkbox-correct-answer"
            name={`create-checkbox-correct-answer-${this.props.cardID}`}
            value={index}
            checked={this.isCorrectAnswer(index)}
            onChange={() => this.adjustAnswer(index)}
            form="create-deck-form"/>
          <textarea
            className="create-checkbox-answer-text"
            placeholder="Option Details (512 Characters)"
            maxLength="512"
            form="create-deck-form"
            onChange={e => this.updateOption(index, e.target.value)}
            required
            value={option}/>
          <button className="create-checkbox-answer-delete"
            onClick={() => this.deleteOption(index)}>
            Delete
          </button>
        </div>
      )
    );
  }

  componentWillUnmount () {
    this.updateAnswer(null, this.props.options);
  }

  isCorrectAnswer (index) {
    return this.answerMap[index];
  }

  adjustAnswer (index) {
    this.answerMap[index] = !this.answerMap[index];

    this.updateAnswer(
      this.tallyNextAnswer(),
      this.props.options
    );
  }

  updateOption (index, value) {
    this.props.options[index] = value;
    this.updateAnswer(this.props.answer, this.props.options);
  }

  deleteOption (index) {
    delete this.answerMap[index];
    delete this.props.options[index];
    this.updateAnswer(
      this.tallyNextAnswer(),
      this.props.options
    );
  }

  addOption () {
    this.lastOptionID++;
    this.props.options[this.lastOptionID] = '';
    this.updateAnswer(this.props.answer, this.props.options);
  }

  tallyNextAnswer () {
    const nextAnswer = [];

    for (let index in this.answerMap) {
      if (this.isCorrectAnswer(index)) {
        nextAnswer.push(index);
      }
    }

    return nextAnswer;
  }

  updateAnswer (answer, options) {
    this.props.onAnswer({answer, options});
  }
}

export default CreateCheckboxAnswer;
