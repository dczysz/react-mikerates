import React, { Component } from 'react';

import ratePaneClasses from '../RatePane/RatePane.module.css';
import classes from './VolumePane.module.css';
import Input from '../../components/Input/Input';
import Totals from '../Totals/Totals';

class VolumePane extends Component {
  state = {
    pcsYear: '',
    pcsWeek: '',
    pcsDay: '',
    numShifts: '',
    hrsShift: 7.5,
    partsPerHour: '',
    partsPerMin: '',
    secPerPart: '',
  }

  pcsYearChangedHandler = (e) => {
    console.log('pcsYearChangedHandler');
    const stateChangeObj = {
      pcsYear: e.target.value,
      pcsWeek: e.target.value / 50,
      pcsDay: e.target.value / 50 / 5,
    }
    this.updateTotals(stateChangeObj);

    // Update pcsYear in App state for Totals reference
    this.props.updatePcsYear(e.target.value);
  }

  pcsWeekChangedHandler = (e) => {
    console.log('pcsWeekChangedHandler');
    const stateChangeObj = {
      pcsYear: e.target.value * 50,
      pcsWeek: e.target.value,
      pcsDay: e.target.value / 5,
    }
    
    // Update pcsYear in App state for Totals reference
    this.props.updatePcsYear(stateChangeObj.pcsYear);
    
    this.updateTotals(stateChangeObj);
  }

  pcsDayChangedHandler = (e) => {
    console.log('pcsDayChangedHandler');
    const stateChangeObj = {
      pcsYear: e.target.value * 50 * 5,
      pcsWeek: e.target.value * 5,
      pcsDay: e.target.value,
    }
    
    // Update pcsYear in App state for Totals reference
    this.props.updatePcsYear(stateChangeObj.pcsYear);

    this.updateTotals(stateChangeObj);
  }

  numShiftsChangedHandler = (e) => {
    if (this.state.pcsYear !== 0   && this.state.pcsYear !== '' &&
        this.state.pcsWeek !== 0   && this.state.pcsWeek !== '' &&
        this.state.pcsDay !== 0    && this.state.pcsDay !== '') {
          this.updateTotals({ numShifts: e.target.value });
    } else if (this.state.partsPerHour !== 0   && this.state.partsPerHour !== '' &&
               this.state.partsPerMin !== 0   && this.state.partsPerMin !== '' &&
               this.state.secPerPart !== 0    && this.state.secPerPart !== '') {
                  this.updatePcs({ numShifts: e.target.value });
    }
  }

  hrsShiftChangedHandler = (e) => {
    this.updateTotals({ hrsShift: e.target.value });
  }

  updateTotals = (newStateChangeObj) => {
    console.log('updateTotals');
    const newState = {...this.state, ...newStateChangeObj};

    // Check if all required input fields are filled in
    if (newState.pcsYear !== 0   && newState.pcsYear !== '' &&
        newState.pcsWeek !== 0   && newState.pcsWeek !== '' &&
        newState.pcsDay !== 0    && newState.pcsDay !== '' &&
        newState.numShifts !== 0 && newState.numShifts !== '' &&
        newState.hrsShift !== 0  && newState.hrsShift !== '') {
          
          // Calculate totals
          newState.partsPerHour = newState.pcsDay / 
            (newState.numShifts * newState.hrsShift);
          newState.partsPerMin = newState.partsPerHour / 60;
          newState.secPerPart = 60 / newState.partsPerMin;
    }

    // Update state
    this.setState(newState);

    // Update secPerPart target in App.js state
    this.props.updateSecPerPartTarget(newState.secPerPart);
  }

  updatePcs = (newStateChangeObj) => {
    console.log('updatePcs');
    const newState = {...this.state, ...newStateChangeObj};

    // Check if all required input fields are filled in
    if (newState.partsPerHour !== 0   && newState.partsPerHour !== '' &&
        newState.partsPerMin !== 0   && newState.partsPerMin !== '' &&
        newState.secPerPart !== 0    && newState.secPerPart !== '' &&
        newState.numShifts !== 0 && newState.numShifts !== '' &&
        newState.hrsShift !== 0  && newState.hrsShift !== '') {
          
          // Calculate totals
          const pcsDay = newState.partsPerHour * 
            newState.numShifts * newState.hrsShift;

          newState.pcsDay = pcsDay;

          newState.pcsWeek = pcsDay * 5;
          newState.pcsYear = pcsDay * 50 * 5;
    }

    // Update state
    this.setState(newState);

    // Update pcsYear in App state for Totals reference
    this.props.updatePcsYear(newState.pcsYear);

    // Update secPerPart target in App.js state
    this.props.updateSecPerPartTarget(newState.secPerPart);
  }

  partsPerHourChangedHandler = (e) => {
    console.log('partsPerHourChanged')
    const stateChangeObj = {
      partsPerHour: e.target.value,
      partsPerMin: e.target.value / 60,
      secPerPart: 60 / e.target.value * 60,
    };

    this.updatePcs(stateChangeObj);
  }

  partsPerMinChangedHandler = (e) => {
    console.log('partsPerMinChanged')
    const stateChangeObj = {
      partsPerHour: e.target.value * 60,
      partsPerMin: e.target.value,
      secPerPart: 60 / e.target.value,
    };

    this.updatePcs(stateChangeObj);
  }

  secPerPartChangedHandler = (e) => {
    console.log('secPerPartChanged')
    const stateChangeObj = {
      partsPerHour: 60 / e.target.value * 60,
      partsPerMin: 60 / e.target.value,
      secPerPart: e.target.value,
    };

    this.updatePcs(stateChangeObj);
  }


  render() {
    return (
      <div>
        <h1 className={ratePaneClasses.heading}>Volume</h1>
        <div className={classes.inputGroup}>
          <Input
            label="Pcs. Year"
            changed={this.pcsYearChangedHandler}
            val={this.state.pcsYear}
          />
          <Input
            label="Week (50)"
            changed={this.pcsWeekChangedHandler}
            val={this.state.pcsWeek}
            showDecimals
          />
          <Input
            label="Day (5)"
            changed={this.pcsDayChangedHandler}
            val={this.state.pcsDay}
            showDecimals
          />
        </div>
        <div className={classes.inputGroup}>
          <Input
            label="# Shifts"
            changed={this.numShiftsChangedHandler}
            val={this.state.numShifts}
          />
          <Input
            label="Hrs. Shift"
            changed={this.hrsShiftChangedHandler}
            val={this.state.hrsShift}
          />
        </div>
        <Totals
          partsPerHour={this.state.partsPerHour}
          partsPerMin={this.state.partsPerMin}
          secPerPart={this.state.secPerPart}
          secPerPartTarget={this.props.secPerPartTarget}
          partsPerHourChanged={this.partsPerHourChangedHandler}
          partsPerMinChanged={this.partsPerMinChangedHandler}
          secPerPartChanged={this.secPerPartChangedHandler}
          disabled="false" // Switched off for now
        />
      </div>
    );
  }
}
 
export default VolumePane;