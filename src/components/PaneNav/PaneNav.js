import React from 'react';

import classes from './PaneNav.module.css';

const paneNav = (props) => {
  return (
    <div className={classes.PaneNav}>
      <div
        className={[classes.arrow, classes.left].join(' ')}
        onClick={props.prev}
      >
        <div className={[classes.line, classes.top].join(' ')}></div>
        <div className={[classes.line, classes.bottom].join(' ')}></div>
      </div>
      <div
        className={[classes.arrow, classes.right].join(' ')}
        onClick={props.next}
      >
        <div className={[classes.line, classes.top].join(' ')}></div>
        <div className={[classes.line, classes.bottom].join(' ')}></div>
      </div>
    </div>
  );
}
 
export default paneNav;