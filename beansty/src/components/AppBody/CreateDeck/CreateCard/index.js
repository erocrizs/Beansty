import { Component } from 'react';
import './CreateCard.css';

class CreateCard extends Component {


  render () {
    return (
      <div className="create-card">
        {this.props.card.question}
      </div>
    );
  }
}

export default CreateCard;