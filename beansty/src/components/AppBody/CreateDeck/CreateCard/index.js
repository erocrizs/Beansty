import { Component } from 'react';
import './CreateCard.css';
import CreateCheckboxAnswer from './CreateCheckboxAnswer';
import CreateArrangeAnswer from './CreateArrangeAnswer';
import CreateListAnswer from './CreateListAnswer';
import CreateRadioAnswer from './CreateRadioAnswer';
import CreateTextAnswer from './CreateTextAnswer';

class CreateCard extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      open: false
    };
  }

  render () {
    return (
      <div className="create-card">
        <div className="create-card-header">
          <textarea
            className="new-card-question"
            name="question"
            placeholder="Question"
            value={this.props.card.question}
            onChange={(e) => this.handleCardChange('question', e.target.value)}
            form="create-deck-form"
            required
            />
          <button className="new-card-dropdown"
            onClick={this.toggleOpen.bind(this)}>
            {this.state.open ? '^' : 'v'}
          </button>
        </div>
        <div className={'create-card-body' + (this.state.open ? '' : ' no-render')}>
          <div className="create-card-point-container">
            <div className="create-card-point-label">Point Value: </div>
            <input type="number"
              className="create-card-point"
              value={this.props.card.point}
              onChange={(e) => this.handleCardChange('point', e.target.value)}
              form="create-deck-form"
              required
              />
          </div>
          <div className="create-card-type">
            <div className="create-card-type-label">Type of question:</div>
            <div className="create-card-type-options">
              {this.renderTypeOption('text', 'Text')}
              {this.renderTypeOption('radio', 'Choose')}
              {this.renderTypeOption('checkbox', 'Checkbox')}
              {this.renderTypeOption('arrange', 'Arrange')}
              {this.renderTypeOption('list', 'List')}
            </div>
          </div>
          {this.displayTypeOptions()}
          <div className="create-card-cancel">
            <button type="button" onClick={() => this.props.onDelete(this)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  toggleOpen () {
    this.setState(state => ({open: !state.open}));
  }

  handleCardChange (property, value) {
    this.props.onUpdate(property, value);
  }

  displayTypeOptions () {
    if (!this.props.card.type) {
      return null;
    }

    let createAnswerComponent;

    switch (this.props.card.type) {
      default:
      case 'text':
        createAnswerComponent = (
          <CreateTextAnswer
            cardID={this.props.card.id}
            answer={this.props.card.answer}
            onAnswer={this.setAnswer.bind(this)}/>
        );
        break;
      case 'radio':
        createAnswerComponent = (
          <CreateRadioAnswer
            cardID={this.props.card.id}
            answer={this.props.card.answer}
            options={this.props.card.options || []}
            onAnswer={this.setAnswer.bind(this)}/>
        );
        break;
      case 'checkbox':
        createAnswerComponent = (
          <CreateCheckboxAnswer
            cardID={this.props.card.id}
            answer={this.props.card.answer}
            options={this.props.card.options || []}
            onAnswer={this.setAnswer.bind(this)}/>
        );
        break;
      case 'arrange':
        createAnswerComponent = (
          <CreateArrangeAnswer
            cardID={this.props.card.id}
            answer={this.props.card.answer}
            onAnswer={this.setAnswer.bind(this)}/>
        );
        break;
      case 'list':
        createAnswerComponent = (
          <CreateListAnswer
            cardID={this.props.card.id}
            answer={this.props.card.answer}
            order={this.props.card.order || false}
            onAnswer={this.setAnswer.bind(this)}/>
        );
        break;
    }

    return (<div className="create-card-answer-container">{createAnswerComponent}</div>)
  }

  async setAnswer ({answer, options, order}) {
    await this.props.onUpdate('answer', answer);
    await this.props.onUpdate('options', options);
    await this.props.onUpdate('order', order)
  }

  renderTypeOption (type, label) {
    return (
      <div className="create-card-type-option">
        <input 
          type="radio"
          id={`card-type-${type}-${this.props.card.id}`}
          name={`card-type-${this.props.card.id}`}
          value={type}
          checked={this.props.card.type === type}
          onChange={(e) => this.changeCardType(e.target.value)}
          form="create-deck-form"
          required/>
        <label className="create-card-type-option-label"
          htmlFor={`card-type-${type}-${this.props.card.id}`}>
          {label}
        </label>
      </div>
    );
  }

  async changeCardType (type) {
    await this.handleCardChange('type', type);
    await this.setAnswer({});
  }
}

export default CreateCard;