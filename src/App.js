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
  }

  updateSecPerPart = () => {

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
            <VolumePane />
          </div>

          <div className="swipeDiv">
            <RatePane
              pageName={this.state.panes[0].name}
              numOfLabel={this.state.panes[0].numOfLabel}
              updateSecPerPart={this.updateSecPerPart}
            />
          </div>

          <div className="swipeDiv">
            <RatePane
              pageName={this.state.panes[1].name}
              numOfLabel={this.state.panes[1].numOfLabel}
            />
          </div>
        </ReactSwipe>
      </div>
    );
  }
}

export default App;
