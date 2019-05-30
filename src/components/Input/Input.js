import React, { Component } from 'react';

import classes from './Input.module.css';

class Input extends Component {

  state = {
    focused: false,
  }

  handleFocus = (event, focused) => {
    this.setState({ focused: focused });
    if (focused) {
      //TODO: select text
    }
  }

  render() {
    // Dont add decimals to integer inputs
    let value = this.props.val;

    if (value === 0 || value === '') {
      value = '';
    } else if (this.props.showDecimals) {
      value = Number(this.props.val);
      // Only set toFixed if not focused
      if (!this.state.focused) {
        value = value.toFixed(2);
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
          readOnly={this.props.readOnly}
          disabled={this.props.disabled}
          onFocus={(event) => this.handleFocus(event, true)}
          onBlur={(event) => this.handleFocus(event, false)}
        ></input>
      </div>
    );
  }
};
 
export default Input;