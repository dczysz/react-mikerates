import React from 'react';

import Input from '../../components/Input/Input';
import classes from './Totals.module.css';

const totals = (props) => {
  const secPerPartTarget = props.secPerPartTarget;
  const secPerPartClassesArr = [];

  if (props.secPerPart !== '') {
    if (props.secPerPart < secPerPartTarget) 
      secPerPartClassesArr.push('success');
    else if (props.secPerPart > secPerPartTarget) 
      secPerPartClassesArr.push('danger');
    else
      secPerPartClassesArr.push('ok');
  }
  const secPerPartClasses = secPerPartClassesArr.join(' ');

    // Condidtionally apply style to secPerPart input depending on target
    return (
      <div className={classes.Totals}>
        <Input
          label="PP/Hour"
          val={props.partsPerHour}
          readOnly
          disabled={props.disabled === 'false' ? false : true}
          onChange={(event) => props.partsPerHourChanged(event)}
          showDecimals
        />
        <Input
          label="PP/Min"
          val={props.partsPerMin}
          readOnly
          disabled={props.disabled === 'false' ? false : true}
          onChange={props.partsPerMinChanged}
          showDecimals
        />
        <Input
          classes={secPerPartClasses}
          label="(s) per part"
          val={props.secPerPart}
          readOnly
          disabled={props.disabled === 'false' ? false : true}
          onChange={props.secPerPartChanged}
          showDecimals
        />
      </div>
    );

}
 
export default totals;