import React from 'react';

import classes from './Target.module.css';

const target = (props) => {

  // Thank you Elias Zamaria: https://stackoverflow.com/a/2901298
  const addCommas = (num) => {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  return (
    <div className={classes.Target}>
      <p>Pcs. Year: <strong>{props.pcsYear === null ? '?' : addCommas(props.pcsYear)}</strong></p>
      <p>(s) Per Part: <strong>{Number(props.target) === 0 ? '?' : Number(props.target).toFixed(2)}</strong></p>
    </div>
  );
}
 
export default target;