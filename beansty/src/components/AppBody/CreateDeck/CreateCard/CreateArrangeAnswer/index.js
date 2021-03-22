import { Component } from 'react';
import './CreateArrangeAnswer.css';

class CreateArrangeAnswer extends Component {
  constructor(props) {
    super(props);
    
    let maxID = -1;
    this.answerID = {};
    for (let index in this.props.answer) {
      maxID++;
      this.answerID[index] = maxID;
    }
  
    this.lastItemIndex = maxID;
  }

  render() {
    return (
      <div className="create-arrange-answer">
        <div className="create-answer-label">
          Answer:
        </div>
        <div className="create-arrange-answer-options">
          {this.renderItems()}
          <button 
            className="create-arrange-answer-options-add"
            onClick={this.addItem.bind(this)}>
            + Add Item
          </button>
        </div>
      </div>
    );
  }

  renderItems () {
    const answerList = [];

    if (!this.props.answer || !this.props.answer.length) {
      return null;
    }

    for (let index in this.props.answer) {
      answerList.push({
        id: this.answerID[index],
        item: this.props.answer[index]
      });
    }

    return answerList.map(
      ({item, id}, index) => (
        <div key={id} className="create-arrange-answer-option">
          <div className="create-arrange-answer-order">{index + 1}</div>
          <button className="create-arrange-answer-move"
            disabled={index === 0}
            onClick={() => this.moveItem(index, -1)}>
            ^
          </button>
          <button className="create-arrange-answer-move"
            disabled={index === this.props.answer.length - 1}
            onClick={() => this.moveItem(index, 1)}>
            v
          </button>
          <textarea
            className="create-arrange-answer-text"
            placeholder="Item Details (512 Characters)"
            maxLength="512"
            form="create-deck-form"
            onChange={e => this.updateItem(index, e.target.value)}
            required
            value={item}/>
          <button className="create-arrange-answer-delete"
            onClick={() => this.deleteItem(index)}>
            Delete
          </button>
        </div>
      )
    );
  }

  updateItem (index, value) {
    this.props.answer[index] = value;
    this.updateAnswer(this.props.answer);
  }

  moveItem (index, step) {
    const otherIndex = index + step;
    
    const swapTemp = this.props.answer[index];
    this.props.answer[index] = this.props.answer[otherIndex];
    this.props.answer[otherIndex] = swapTemp;

    this.updateAnswer(this.props.answer);
  }

  deleteItem (index) {
    for (let i = index + 1; i < this.props.answer.length; i++) {
      this.answerID[i-1] = this.answerID[i];
    }

    delete this.answerID[this.props.answer.length - 1];
    this.props.answer.splice(index, 1);
    this.updateAnswer(this.props.answer);
  }

  addItem () {
    let nextAnswer = this.props.answer || [];

    this.lastItemIndex++;
    nextAnswer.push('');
    this.answerID[nextAnswer.length - 1] = this.lastItemIndex;
    this.updateAnswer(nextAnswer, this.props.order);
  }

  updateAnswer (answer) {
    this.props.onAnswer({answer});
  }
}

export default CreateArrangeAnswer;
