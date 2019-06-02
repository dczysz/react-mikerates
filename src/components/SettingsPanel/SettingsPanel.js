import React, { Component } from 'react';

import classes from './SettingsPanel.module.css';
import PaneEditor from './PaneEditor/PaneEditor';

class SettingsPanel extends Component {

  state = {
    allowEditing: true,
  }

  // Only update if panel is to be shown or showing
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show || this.props.show;
  }

  setAllowEditingHandler = (bool) => {
    this.setState({ allowEditing: bool });
  }

  render() {
    const paneEditors = this.props.panes.map(paneObj => {
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
            tabIndex="-1"
            aria-label="Toggle dark mode"
          >
            <i className="far fa-lightbulb"></i>
          </button>
        </div>

        {paneEditors}

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