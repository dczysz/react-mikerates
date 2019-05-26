import React from 'react';

import classes from './TopBar.module.css';
import DrawerToggle from '../DrawerToggle/DrawerToggle';

const topBar = (props) => {

  // Thank you Elias Zamaria: https://stackoverflow.com/a/2901298
  const addCommas = (num) => {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  return (
    <div className={classes.TopBar}>
      <div className={classes.Target}>
        <p>Pcs. Year: <strong>{props.pcsYear === null ? '?' : addCommas(props.pcsYear)}</strong></p>
        <p>(s) Per Part: <strong>{props.target === null || props.target === undefined ? '?' : Number(props.target).toFixed(2)}</strong></p>
      </div>
      <DrawerToggle
        clicked={props.clicked}
      />
    </div>
  );
}
 
export default topBar;