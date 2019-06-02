import React from 'react';

import Input from '../../components/Input/Input';
import classes from './Totals.module.css';

const totals = (props) => {
  const secPerPartTarget = props.secPerPartTarget;
  const secPerPartClassesArr = [];
  
  // Condidtionally apply style to secPerPart input depending on target
  if (props.secPerPart !== '') {
    if (props.secPerPart < secPerPartTarget) 
      secPerPartClassesArr.push('success');
    else if (props.secPerPart > secPerPartTarget) 
      secPerPartClassesArr.push('danger');
    else
      secPerPartClassesArr.push('ok');
  }
  const secPerPartClasses = secPerPartClassesArr.join(' ');

    return (
      <div className={classes.Totals}>
        <Input
          label="PP/Hour"
          val={props.partsPerHour}
          disabled={props.disabled === 'false' ? false : true}
          changed={(event) => props.partsPerHourChanged(event)}
        />
        <Input
          label="PP/Min"
          val={props.partsPerMin}
          disabled={props.disabled === 'false' ? false : true}
          changed={props.partsPerMinChanged}
        />
        <Input
          classes={secPerPartClasses}
          label="(s) per part"
          val={props.secPerPart}
          disabled={props.disabled === 'false' ? false : true}
          changed={props.secPerPartChanged}
        />
      </div>
    );

}
 
export default totals;