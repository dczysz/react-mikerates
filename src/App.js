import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';

import './App.css';
import VolumePane from './containers/VolumePane/VolumePane';
import RatePane from './containers/RatePane/RatePane';
import TopBar from './components/TopBar/TopBar';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import Backdrop from './components/Backdrop/Backdrop';
import PaneNav from './components/PaneNav/PaneNav';

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
    swipeRefresh: 0, // Increment to force react-swipe to update
    darkMode: true,
    position: 0,
  }

  componentWillMount() {
    // Overwrite default panes, secPerPart, darkMode state with cookie if present
    const cookie = this.getCookie('panes');
    const darkEnabled = this.getCookie('darkModeEnabled');

    if (cookie && darkEnabled) {
      const cookiePanes = JSON.parse(cookie);
      
      const cookieSecPerPartStrArr = cookiePanes.map(pane => pane.name);
      const newSecPerPartState = {};
      cookieSecPerPartStrArr.forEach(paneName => newSecPerPartState[paneName] = null);

      // Set new nextId according to highest id in cookie
      let paneIds = cookiePanes.map(pane => pane.id);
      let newNextId = 0;
      paneIds.forEach(id => newNextId = id >= newNextId ? id + 1 : newNextId);

      this.setState({
        panes: cookiePanes,
        secPerPart: newSecPerPartState,
        nextId: newNextId,
        darkMode: darkEnabled,
      });
    } 
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

  editPaneHandler = editiedPaneObj => {
    // Copy pane state
    const newPaneState = this.state.panes.map(pane => {
      return pane.id === editiedPaneObj.id ? editiedPaneObj : {...pane};
    });

    // Update state
    this.setState({
      panes: newPaneState,
      swipeRefresh: this.state.swipeRefresh + 1,
    });

    this.updatePanesCookie(newPaneState);
  }

  updatePanesCookie = (newPaneState) => {
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    document.cookie = `panes=${JSON.stringify(newPaneState)}; expires=${date.toUTCString()}`;
  }

  updateDarkModeCookie = (isEnabled) => {
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    document.cookie = `darkModeEnabled=${isEnabled}; expires=${date.toUTCString()}`;
  }

  darkToggleClickedHandler = () => {
    this.updateDarkModeCookie(!this.state.darkMode);
    this.setState({ darkMode: !this.state.darkMode });
  }

  render() {
    let reactSwipeEl;

    // Set up other panes (besides volume)
    const ratePanes = this.state.panes.map((pane, index) => {
      return (
        <div 
          className="swipeDiv"
          key={pane.id}>
          <RatePane
            pageName={pane.name}
            numOfLabel={pane.numOfLabel}
            secPerPartTarget={this.state.secPerPart.volume}
          />
        </div>
      );
    });

    return (
      <div className={this.state.darkMode ? 'App Dark' : 'App Light'}>
        <TopBar
          pcsYear={this.state.pcsYear}
          target={this.state.secPerPart.volume}
          clicked={this.toggleShowSettings}
          showSettings={this.state.showSettings}
        />

        <PaneNav
          className="PaneNav"
          prev={() => reactSwipeEl.prev()}
          next={() => reactSwipeEl.next()}
          pos={null}
          // len={this.state.panes.length + 1}
        />

        
        <ReactSwipe
          //! ReactSwipe must have divs as children, then components
          swipeOptions={{
            continuous: false,
            //TODO: Setting state prevents page changes...figure out how to send to PaneNav
            callback: (pageIndex) => {
              // this.setState({ position: pageIndex });
              console.log(pageIndex)
            }
          }}
          className={this.state.showSettings ? "ReactSwipe blur" : "ReactSwipe"}
          ref={el => (reactSwipeEl = el)}
          key={this.state.swipeRefresh} // Only refreshes correctly on key change
        >
          <div className="swipeDiv">
            <VolumePane
              secPerPartTarget={this.state.secPerPart.volume}
              updateSecPerPartTarget={(newTargetVal) => this.secPerPartTargetChangedHandler(newTargetVal)}
              updatePcsYear={(newPcsYearVal) => this.pcsYearChangedHandler(newPcsYearVal)}
              swipeEl={reactSwipeEl}
            />
          </div>

          {ratePanes}

        </ReactSwipe>

        <SettingsPanel
          show={this.state.showSettings}
          clicked={this.toggleShowSettings}
          panes={this.state.panes}
          deleteClicked={this.deletePaneHandler}
          addPane={this.addPaneHandler}
          editPane={this.editPaneHandler}
          darkToggleClicked={this.darkToggleClickedHandler}
          darkEnabled={this.state.darkMode}
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
