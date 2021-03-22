import { Component, Fragment } from 'react';
import './CreateListAnswer.css';

class CreateListAnswer extends Component {
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
      <div className="create-list-answer">
        <div className="create-list-order">
          <input 
            type="checkbox"
            checked={this.props.order || false}
            onChange={this.flipOrder.bind(this)}
            form="create-deck-form"/>
          Ordered List
        </div>
        <div className="create-answer-label">
          Answer:
        </div>
        <div className="create-list-answer-options">
          {this.renderItems()}
          <button 
            className="create-list-answer-options-add"
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
        <div key={id} className="create-list-answer-option">
          <div className="create-list-answer-order">
            {this.props.order ? index + 1 : '•' }
          </div>
          {this.renderSortButtons(index)}
          <textarea
            className="create-list-answer-text"
            placeholder="Item Details (512 Characters)"
            maxLength="512"
            form="create-deck-form"
            onChange={e => this.updateItem(index, e.target.value)}
            required
            value={item}/>
          <button className="create-list-answer-delete"
            onClick={() => this.deleteItem(index)}>
            Delete
          </button>
        </div>
      )
    );
  }

  renderSortButtons (index) {
    if (this.props.order) {
      return (
        <Fragment>
          <button className="create-list-answer-move"
            disabled={index === 0}
            onClick={() => this.moveItem(index, -1)}>
            ^
          </button>
          <button className="create-list-answer-move"
            disabled={index === this.props.answer.length - 1}
            onClick={() => this.moveItem(index, 1)}>
            v
          </button>
        </Fragment>
      );
    }
  }

  updateItem (index, value) {
    this.props.answer[index] = value;
    this.updateAnswer(this.props.answer, this.props.order);
  }

  moveItem (index, step) {
    const otherIndex = index + step;
    
    const swapTemp = this.props.answer[index];
    this.props.answer[index] = this.props.answer[otherIndex];
    this.props.answer[otherIndex] = swapTemp;

    this.updateAnswer(this.props.answer, this.props.order);
  }

  deleteItem (index) {
    for (let i = index + 1; i < this.props.answer.length; i++) {
      this.answerID[i-1] = this.answerID[i];
    }

    delete this.answerID[this.props.answer.length - 1];
    this.props.answer.splice(index, 1);
    this.updateAnswer(this.props.answer, this.props.order);
  }

  addItem () {
    let nextAnswer = this.props.answer || [];

    this.lastItemIndex++;
    nextAnswer.push('');
    this.answerID[nextAnswer.length - 1] = this.lastItemIndex;
    this.updateAnswer(nextAnswer, this.props.order);
  }

  flipOrder () {
    this.updateAnswer(this.props.answer, !this.props.order);
  }

  updateAnswer (answer, order) {
    this.props.onAnswer({answer, order});
  }
}

export default CreateListAnswer;
