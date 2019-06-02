import React, { Component } from 'react';

import classes from './Input.module.css';

class Input extends Component {

  state = {
    focused: false,
  }

  handleFocus = (event) => {
    console.log('focus')
    this.setState({ focused: true });
  }

  render() {
    // Round when not focused
    let value = this.props.val;

    if (value === 0 || value === '') {
      value = '';
    }
    else if (!this.state.focused) {
      // Check if needs to round
      if (Number(value).toFixed(2) != Number(value)) {
        value = Number(value).toFixed(2);
      }
    }

    return (
      <div className={classes.Input}>
        <label
          htmlFor={this.props.label}
          className={classes.label}
        >
          {this.props.label}
        </label>
        <input
          id={this.props.label}
          className={[classes.inputField, classes[this.props.classes]].join(' ')}
          type="number"
          tabIndex="-1"
          value={value}
          onChange={this.props.changed}
          disabled={this.props.disabled}
          onFocus={(e) => this.handleFocus(e)}
          onBlur={(e) => this.setState({ focused: false })}
          onClick={(e) => e.target.select()} // Only works in Chrome, not FF
          step="any"
        ></input>
      </div>
    );
  }
};
 
export default Input;