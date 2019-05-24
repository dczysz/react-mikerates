import React from 'react';

import classes from './Target.module.css';

const target = (props) => {
  return (
    <div className={classes.Target}>
      <p>Pcs. Year: {props.pcsYear}</p>
      <p>(s) Per Part: {Number(props.target) === 0 ? '?' : Number(props.target).toFixed(2)}</p>
    </div>
  );
}
 
export default target;