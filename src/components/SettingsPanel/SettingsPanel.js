import React, { Component } from 'react';

import classes from './SettingsPanel.module.css';
import PaneEditor from './PaneEditor/PaneEditor';

class SettingsPanel extends Component {
  state = {

  }

  // panesCopy = this.props.panes.map(paneObj => {
  //   return {...paneObj};
  // });

  paneChangedHandler = (e) => {
    console.log(e);
    
  }

  panesComps = this.props.panes.map(paneObj => {
    return (
      <PaneEditor
        key={paneObj.id}
        id={paneObj.id}
        name={paneObj.name}
        numOfLabel={paneObj.numOfLabel}
        changed={this.paneChangedHandler}
        deleteClicked={this.props.deleteClicked}
      />
    );
  });

  render() {
    // Set panel to open or closed
    const panelClasses = [classes.SettingsPanel];
    panelClasses.push(this.props.show ? classes.open : classes.closed);

    return (
      <div className={panelClasses.join(' ')}>
        <h2>Settings</h2>

        {this.panesComps}

        <PaneEditor
          key="newPanel"
          id={null}
          // name={paneObj.name}
          // numOfLabel={paneObj.numOfLabel}
          changed={this.paneChangedHandler}
          deleteClicked={this.props.deleteClicked}
          addPane={this.props.addPane}
          new
        />
      </div>
    );
  }
}
 
export default SettingsPanel;