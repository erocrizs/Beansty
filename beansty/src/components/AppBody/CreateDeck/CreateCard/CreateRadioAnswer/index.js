import { Component } from 'react';
import './CreateRadioAnswer.css';

class CreateRadioAnswer extends Component {
  constructor(props) {
    super(props);
    
    let maxID = -1;
    for (let index in this.props.options) {
      if (maxID < +index) {
        maxID = +index;
      }
    }
  
    this.lastOptionID = maxID;
  }
  

  render() {
    return (
      <div className="create-radio-answer">
        <div className="create-answer-label">
          Options (Mark the correct answer):
        </div>
        <div className="create-radio-answer-options">
          {this.renderOptions()}
          <button 
            className="create-radio-answer-options-add"
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
        <div key={index} className="create-radio-answer-option">
          <input 
            type="radio"
            className="create-radio-correct-answer"
            name={`create-radio-correct-answer-${this.props.cardID}`}
            value={index}
            checked={index === parseInt(this.props.answer)}
            onChange={() => this.updateAnswer(index, this.props.options)}
            form="create-deck-form"
            required/>
          <textarea
            className="create-radio-answer-text"
            placeholder="Option Details (512 Characters)"
            maxLength="512"
            form="create-deck-form"
            onChange={e => this.updateOption(index, e.target.value)}
            required
            value={option}/>
          <button className="create-radio-answer-delete"
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

  updateOption (index, value) {
    this.props.options[index] = value;
    this.updateAnswer(this.props.answer, this.props.options);
  }

  deleteOption (index) {
    const nextAnswer = (index === +this.props.answer)
      ? null
      : this.props.answer;

    delete this.props.options[index];
    this.updateAnswer(nextAnswer, this.props.options);
  }

  addOption () {
    this.lastOptionID++;
    this.props.options[this.lastOptionID] = '';
    this.updateAnswer(this.props.answer, this.props.options);
  }

  updateAnswer (answer, options) {
    this.props.onAnswer({answer, options});
  }
}

export default CreateRadioAnswer;
