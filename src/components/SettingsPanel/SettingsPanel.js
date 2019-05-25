import React, { Component } from 'react';

import classes from './SettingsPanel.module.css';
import PaneEditor from './PaneEditor/PaneEditor';

class SettingsPanel extends Component {
  state = {

  }

  componentWillUpdate() {
    console.log('[SettingsPanel] will update');
    console.log(this.props.panes)
  }


  

  render() {
    const panesComps = this.props.panes.map(paneObj => {
      return (
        <PaneEditor
          key={paneObj.id}
          id={paneObj.id}
          name={paneObj.name}
          numOfLabel={paneObj.numOfLabel}
          deleteClicked={this.props.deleteClicked}
          editPane={this.props.editPane}
        />
      );
    });

    // Set panel to open or closed
    const panelClasses = [classes.SettingsPanel];
    panelClasses.push(this.props.show ? classes.open : classes.closed);

    return (
      <div className={panelClasses.join(' ')}>
        <h2>Settings</h2>

        {panesComps}

        <PaneEditor
          key="newPanel"
          id={null}
          deleteClicked={this.props.deleteClicked}
          addPane={this.props.addPane}
          new
        />
      </div>
    );
  }
}
 
export default SettingsPanel;