import { Component } from 'react';
import './CreateCard.css';

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
            onChange={(e) => this.handleCardChange(e, 'question')}
            />
          <button className="new-card-dropdown"
            onClick={this.toggleOpen.bind(this)}>
            {this.state.open ? '^' : 'v'}
          </button>
        </div>
        <div className="create-card-body" className={this.state.open ? '' : 'no-render'}>
          <div className="create-card-point-container">
            <div className="create-card-point-label">Point Value: </div>
            <input type="text"
              className="create-card-point"
              value={this.props.card.point}
              onChange={(e) => this.handleCardChange(e, 'point')}/>
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
    this.setState({
      ...this.state,
      open: !this.state.open
    });
  }

  handleCardChange (event, property) {
    const value = event.target.value;
    this.props.onUpdate(property, value);
  }

  displayTypeOptions () {
    return (<div>{this.props.card.type || 'none'}</div>)
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
          onChange={(e) => this.handleCardChange(e, 'type')}/>
        <label htmlFor={`card-type-${type}-${this.props.card.id}`}>
          {label}
        </label>
      </div>
    );
  }
}

export default CreateCard;