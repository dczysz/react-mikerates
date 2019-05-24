import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';

import './App.css';
import VolumePane from './containers/VolumePane/VolumePane';
import RatePane from './containers/RatePane/RatePane';
import Target from './components/Target/Target';

class App extends Component {
  state = {
    panes: [
      {
        name: 'winding',
        numOfLabel: 'heads',
      },
      {
        name: 'molding',
        numOfLabel: 'cavities',
      },
    ],
    secPerPart: {
      volume: null,
      winding: null,
      molding: null,
    },
    pcsYear: null,
  }

  secPerPartTargetChangedHandler = (newTargetVal) => {
    const newSecPerPartState = {...this.state.secPerPart};
    newSecPerPartState.volume = newTargetVal;

    this.setState({ secPerPart: newSecPerPartState });
  }

  pcsYearChangedHandler = (newPcsYearVal) => {
    this.setState({ pcsYear: newPcsYearVal });
  }

  render() {
    let reactSwipeEl; //! ReactSwipe must have divs as children, then components

    const ratePanes = this.state.panes.map((pane, index) => {
      return (
        <div 
          className="swipeDiv"
          key={pane.name + index}>
          <RatePane
            pageName={pane.name}
            numOfLabel={pane.numOfLabel}
            secPerPartTarget={this.state.secPerPart[pane.name]}
          />
        </div>
      );
    });

    return (
      <div className="App">
        <Target
          pcsYear={this.state.pcsYear}
          target={this.state.secPerPart.volume}
        />

        <ReactSwipe
          swipeOptions={{ continuous: false }}
          ref={el => (reactSwipeEl = el)}
        >
          <div className="swipeDiv">
            <VolumePane
              secPerPartTarget={this.state.secPerPart.volume}
              updateSecPerPartTarget={(newTargetVal) => this.secPerPartTargetChangedHandler(newTargetVal)}
              updatePcsYear={(newPcsYearVal) => this.pcsYearChangedHandler(newPcsYearVal)} />
          </div>

          {ratePanes}

        </ReactSwipe>
      </div>
    );
  }
}

export default App;
