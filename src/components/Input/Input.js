import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
  return (
    <div className={classes.Input}>
      <label className={classes.label}>{props.label}</label>
      <input
        className={classes.inputField}
        type="number"
        value={props.input}
        onChange={(event) => props.changed(event.target.value)}
      ></input>
    </div>
  );
};
 
export default input;