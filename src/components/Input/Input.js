import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  return (
    <div className={classes.Input}>
      <label className={classes.label}>{props.label}</label>
      <input
        className={[classes.inputField, classes[props.classes]].join(' ')}
        type="number"
        value={props.val === 0 || props.val === '' ? '' : Number(props.val).toFixed(2)}
        onChange={props.changed}
        readOnly={props.readOnly}
        disabled={props.disabled}
      ></input>
    </div>
  );
};
 
export default input;