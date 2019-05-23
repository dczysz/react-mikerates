import React, { Component } from 'react';

import classes from './RatePane.module.css';
import Input from '../../components/Input/Input';

class RatePane extends Component {
  state = {
    numOf: '',
    cycleTime: '',
    partsPerHour: '',
    partsPerMin: '',
    secPerPart: '',
  }

  numOfChangedHandler = (numOfVal) => {
    console.log('[RatePane] numOfChangedHandler()', numOfVal)
    this.setState({ numOf: Number(numOfVal) });
    this.updateTotals();
  }

  cycleTimeChangedHandler = (cycleTime) => {
    console.log('[RatePane] cycleTimeChangedHandler()', cycleTime)
    this.setState({ cycleTime: Number(cycleTime) });
    this.updateTotals();
  }

  updateTotals = () => {
    console.log('[RatePane] updateTotals()');
    const numOf = this.state.numOf;
    const cycleTime = this.state.cycleTime;

    if (numOf != 0 && cycleTime != 0) {
      console.log('wtf');
      
      const secPerPart = cycleTime / numOf;
      const partsPerMin = 60 / secPerPart;
      const partsPerHour = 60 * partsPerMin;

      this.setState({ 
        secPerPart: secPerPart,
        partsPerMin: partsPerMin,
        partsPerHour: partsPerHour,
      });
      console.log(this.state);
    }
  }

  render() {

    return (
      <div className={classes.RatePane}>
        <h1 className={classes.heading}>{this.props.pageName}</h1>
        <Input
          label={'# ' + this.props.numOfLabel}
          changed={this.numOfChangedHandler}
          input={this.state.numOf}
        />
        <Input
          label="Cycle Time (s)"
          changed={this.cycleTimeChangedHandler}
          input={this.state.cycleTime}
        />
      </div>
    );
  }
}
 
export default RatePane;