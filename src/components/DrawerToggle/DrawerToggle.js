import React from 'react';

import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div className={[classes.topLine, props.showSettings ? classes.topClosed : classes.topOpen].join(' ')}></div>
    <div className={[classes.bottomLine, props.showSettings ? classes.bottomClosed : classes.bottomOpen].join(' ')}></div>
  </div>
);

export default drawerToggle;