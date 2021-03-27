import {Component} from 'react';
import './PassingGradeSlider.css';

class PassingGradeSlider extends Component {
  render () {
    return (
      <div className="passing-grade-slider">
        <label htmlFor="passing-grade-input">
          {this.props.label}
        </label>
        <input
          type="range"
          name="passing"
          id="passing-grade-input"
          form={this.props.form}
          min="0"
          max="100"
          step="1"
          value={this.props.passing}
          onChange={this.updatePassing.bind(this)}
          />
        <input
          type="number"
          name="passing"
          id="passing-grade-input-text"
          min="0"
          max="100"
          step="1"
          value={this.props.passing}
          onChange={this.updatePassing.bind(this)}
          required
          />
      </div>
    );
  }

  updatePassing (event) {
    const newValue = event.target.value;
    if (newValue === '' || newValue === '100' || newValue.match(/^\d?\d$/)) {
      this.props.onUpdate(newValue);
    }
  }
}

export default PassingGradeSlider;