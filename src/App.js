import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';

import './App.css';
import VolumePane from './containers/VolumePane/VolumePane';
import RatePane from './containers/RatePane/RatePane';
import Target from './components/TopBar/TopBar';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import Backdrop from './components/Backdrop/Backdrop';

class App extends Component {
  state = {
    panes: [
      {
        id: 1,
        name: 'winding',
        numOfLabel: 'heads',
      },
      {
        id: 2,
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
    showSettings: false,
    nextId: 3,
    swipeRefresh: 0,
  }

  componentDidMount() {
    // Overwrite default panes state with cookie if present
    const cookiePanes = this.getCookie('panes');
    if (cookiePanes) this.setState({
      panes: JSON.parse(cookiePanes),
    })
  }

  getCookie = (cookieName) => {
    let name = cookieName + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }

  secPerPartTargetChangedHandler = (newTargetVal) => {
    const newSecPerPartState = {...this.state.secPerPart};
    newSecPerPartState.volume = newTargetVal;

    this.setState({ secPerPart: newSecPerPartState });
  }

  pcsYearChangedHandler = (newPcsYearVal) => {
    this.setState({ pcsYear: newPcsYearVal });
  }

  toggleShowSettings = () => {
    // Open or close settings 
    this.setState({ showSettings: !this.state.showSettings });
  }

  deletePaneHandler = paneId => {
    // Copy pane state
    const newPaneState = this.state.panes.map(pane => {
      return {...pane};
    })
    .filter(pane => pane.id !== paneId);

    this.setState({
      panes: newPaneState,
      swipeRefresh: this.state.swipeRefresh + 1,
    });

    this.updatePanesCookie(newPaneState);
  }

  addPaneHandler = newPaneObj => {
    // Copy pane state
    const newPaneState = this.state.panes.map(pane => {
      return {...pane};
    });

    // Add next available id, push to new state obj
    newPaneObj.id = this.state.nextId;
    newPaneState.push(newPaneObj);

    this.setState({
      panes: newPaneState,
      nextId: this.state.nextId + 1,
      swipeRefresh: this.state.swipeRefresh + 1,
    });

    this.updatePanesCookie(newPaneState);
  }

  updatePanesCookie = (newPaneState) => {
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    document.cookie = `panes=${JSON.stringify(newPaneState)}; expires=${date.toUTCString()}`;
  }

  render() {
    let reactSwipeEl; //! ReactSwipe must have divs as children, then components

    // Set up other panes (besides volume)
    const ratePanes = this.state.panes.map((pane, index) => {
      return (
        <div 
          className="swipeDiv"
          key={pane.name + index}>
          <RatePane
            pageName={pane.name}
            numOfLabel={pane.numOfLabel}
            secPerPartTarget={this.state.secPerPart.volume}
          />
        </div>
      );
    });

    return (
      <div className="App">
        <Target
          pcsYear={this.state.pcsYear}
          target={this.state.secPerPart.volume}
          clicked={this.toggleShowSettings}
        />

        <ReactSwipe
          swipeOptions={{ continuous: false }}
          ref={el => (reactSwipeEl = el)}
          key={this.state.swipeRefresh} // Only refreshes correctly on key change
        >
          <div className="swipeDiv">
            <VolumePane
              secPerPartTarget={this.state.secPerPart.volume}
              updateSecPerPartTarget={(newTargetVal) => this.secPerPartTargetChangedHandler(newTargetVal)}
              updatePcsYear={(newPcsYearVal) => this.pcsYearChangedHandler(newPcsYearVal)} />
          </div>

          {ratePanes}

        </ReactSwipe>

        <SettingsPanel
          show={this.state.showSettings}
          clicked={this.toggleShowSettings}
          panes={this.state.panes}
          deleteClicked={this.deletePaneHandler}
          addPane={this.addPaneHandler}
        />
        <Backdrop
          show={this.state.showSettings}
          clicked={this.toggleShowSettings}
        />
      </div>
    );
  }
}

export default App;
