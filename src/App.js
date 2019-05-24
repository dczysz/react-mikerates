import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';

import './App.css';
import RatePane from './containers/RatePane/RatePane';
import VolumePane from './containers/VolumePane/VolumePane';

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

  render() {
    let reactSwipeEl;
    //! ReactSwipe must have divs as children, then components
    return (
      <div className="App">
        <ReactSwipe
          swipeOptions={{ continuous: false }}
          ref={el => (reactSwipeEl = el)}
        >
          <div className="swipeDiv">
            <VolumePane
              secPerPartTarget={this.state.secPerPart.volume}
              updateSecPerPartTarget={(newTargetVal) => this.secPerPartTargetChangedHandler(newTargetVal)} />
          </div>

          <div className="swipeDiv">
            <RatePane
              pageName={this.state.panes[0].name}
              numOfLabel={this.state.panes[0].numOfLabel}
              secPerPartTarget={this.state.secPerPart.volume}
            />
          </div>

          <div className="swipeDiv">
            <RatePane
              pageName={this.state.panes[1].name}
              numOfLabel={this.state.panes[1].numOfLabel}
              secPerPartTarget={this.state.secPerPart.volume}
            />
          </div>
        </ReactSwipe>
      </div>
    );
  }
}

export default App;
