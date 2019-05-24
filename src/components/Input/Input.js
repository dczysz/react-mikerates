import React from 'react';

import classes from './Input.module.css';

const input = (props) => {

  // TODO: Make this better, wonky in different ways on ff/chrome
  // Dont add decimals to integer inputs
  let value = props.val;

  if (value === 0 || value === '') {
    value = '';
  } else if (props.showDecimals) {
    value = Number(props.val).toFixed(2);
  }

  return (
    <div className={classes.Input}>
      <label className={classes.label}>{props.label}</label>
      <input
        className={[classes.inputField, classes[props.classes]].join(' ')}
        type="number"
        value={value}
        onChange={props.changed}
        readOnly={props.readOnly}
        disabled={props.disabled}
      ></input>
    </div>
  );
};
 
export default input;