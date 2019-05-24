import React, { Component } from 'react';

import Input from '../../components/Input/Input';
import classes from './Totals.module.css';

class Totals extends Component {
  state = {
    
  }

  render() {
    // Condidtionally apply style to secPerPart input depending on target
    const secPerPartTarget = this.props.secPerPartTarget;
    const secPerPartClassesArr = [];

    if (this.props.secPerPart < secPerPartTarget) 
      secPerPartClassesArr.push('success');
    else if (this.props.secPerPart > secPerPartTarget) 
      secPerPartClassesArr.push('danger');
    else
      secPerPartClassesArr.push('ok');
    
      const secPerPartClasses = secPerPartClassesArr.join(' ');

    return (
      <div className={classes.Totals}>
        <Input
          label="PP/Hour"
          val={this.props.partsPerHour}
          readOnly
          disabled
        />
        <Input
          label="PP/Min"
          val={this.props.partsPerMin}
          readOnly
          disabled
        />
        <Input
          classes={secPerPartClasses}
          label="(s) per part"
          val={this.props.secPerPart}
          readOnly
          disabled

        />
        <div>
          Target: {this.props.secPerPartTarget}
        </div>
      </div>
    );
  }
}
 
export default Totals;