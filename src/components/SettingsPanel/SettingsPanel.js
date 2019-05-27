import React, { Component } from 'react';

import classes from './SettingsPanel.module.css';
import PaneEditor from './PaneEditor/PaneEditor';

class SettingsPanel extends Component {

  state = {
    allowEditing: true,
  }

  componentWillUpdate() {
    console.log('[SettingsPanel] will update');
    console.log(this.props.panes)
  }

  setAllowEditingHandler = (bool) => {
    this.setState({ allowEditing: bool });
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
          allowEditing={this.state.allowEditing}
          setAllowEditing={this.setAllowEditingHandler}
        />
      );
    });

    // Set panel to open or closed
    const panelClasses = [classes.SettingsPanel];
    panelClasses.push(this.props.show ? classes.open : classes.closed);

    return (
      <div className={panelClasses.join(' ')}>

          <h2>Settings</h2>
        <div className={classes.heading}>

          <button
            className={[classes.darkToggle, this.props.darkEnabled ?classes.dark : classes.light].join(' ')}
            onClick={this.props.darkToggleClicked}
          >
            <i className="far fa-lightbulb"></i>
          </button>
        </div>

        {panesComps}

        <PaneEditor
          key="newPanel"
          id={null}
          deleteClicked={this.props.deleteClicked}
          addPane={this.props.addPane}
          new
          allowEditing={this.state.allowEditing}
          setAllowEditing={this.setAllowEditingHandler}
        />
      </div>
    );
  }
}
 
export default SettingsPanel;