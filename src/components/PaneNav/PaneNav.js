import React from 'react';

import classes from './PaneNav.module.css';

const paneNav = (props) => {

  // let pos;
  // try {
  //   pos = props.pos() || 0;
  //   console.log('pos', pos)
  // } catch (e) {
  //   pos = 0;
  //   console.log('caught')
  // }

  return (
    <div className={classes.PaneNav}>
      <div
        className={[classes.arrow, classes.left].join(' ')}
        onClick={props.prev}
        // disabled={pos <= 0}
      >
        <div className={[classes.line, classes.top].join(' ')}></div>
        <div className={[classes.line, classes.bottom].join(' ')}></div>
      </div>
      <div
        className={[classes.arrow, classes.right].join(' ')}
        onClick={props.next}
        // disabled={pos}
      >
        <div className={[classes.line, classes.top].join(' ')}></div>
        <div className={[classes.line, classes.bottom].join(' ')}></div>
      </div>
    </div>
  );
}
 
export default paneNav;