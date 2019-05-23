import React, { Component } from 'react';

import Input from '../../components/Input/Input';
import ratePaneClasses from '../RatePane/RatePane.module.css';
import classes from './VolumePane.module.css';

class VolumePane extends Component {
  state = {
    
  }

  render() { 
    return (
      <div>
        <h1 className={ratePaneClasses.heading}>Volume</h1>
        <div className={classes.inputGroup}>
          <Input label="Pcs. Year" />
          <Input label="Week (50)" />
          <Input label="Day (5)" />
        </div>
        <div className={classes.inputGroup}>
          <Input label="# Shifts" />
          <Input label="Hrs. Shift" />
        </div>
        <div>
          Totals placeholder
        </div>
      </div>
    );
  }
}
 
export default VolumePane;