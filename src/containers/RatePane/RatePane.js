import React, { Component } from 'react';

import classes from './RatePane.module.css';
import Input from '../../components/Input/Input';
import Totals from '../Totals/Totals';

class RatePane extends Component {
  state = {
    numOf: '',
    cycleTime: '',
    partsPerHour: '',
    partsPerMin: '',
    secPerPart: '',
  }

  //! Can't do here, infinite update loop
  // componentWillUpdate = () => {
  //   console.log('componentWillUpdate')
  //   this.updateTotals();
  // }

  numOfChangedHandler = (e) => {
    console.log('[RatePane] numOfChangedHandler()', e.target.value)
    this.updateTotals({ numOf: Number(e.target.value) });
  }

  cycleTimeChangedHandler = (e) => {
    console.log('[RatePane] cycleTimeChangedHandler()', e.target.value)
    this.updateTotals({ cycleTime: Number(e.target.value) });
  }

  updateTotals = (newStateChangeObj) => {
    console.log('[RatePane] updateTotals()');

    // Copy state and overwrite changed val with newStateChangeObj
    const newState = {...this.state, ...newStateChangeObj};
    console.log(newState);

    // Calculate totals
    if (newState.numOf !== 0 && newState.numOf !== '' &&
      newState.cycleTime !== 0 && newState.cycleTime !== '') {
      console.log('calculating...');
      
      newState.secPerPart = newState.cycleTime / newState.numOf;
      newState.partsPerMin = 60 / newState.secPerPart;
      newState.partsPerHour = 60 * newState.partsPerMin;

      console.log('Calculated totals:', newState);
    }

    // Update state
    this.setState(newState);
  }

  render() {

    return (
      <div className={classes.RatePane}>
        <div>
          <h1 className={classes.heading}>{this.props.pageName}</h1>
          <Input
            label={'# ' + this.props.numOfLabel}
            changed={this.numOfChangedHandler}
            val={this.state.numOf}
          />
          <Input
            label="Cycle Time (s)"
            changed={this.cycleTimeChangedHandler}
            val={this.state.cycleTime}
          />
        </div>
        
        <Totals
          partsPerHour={this.state.partsPerHour}
          partsPerMin={this.state.partsPerMin}
          secPerPart={this.state.secPerPart}
          secPerPartTarget={this.props.secPerPartTarget}
        />
      </div>
    );
  }
}
 
export default RatePane;