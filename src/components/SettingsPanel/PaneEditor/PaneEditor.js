import React, { Component } from 'react';

import classes from './PaneEditor.module.css';

class PaneEditor extends Component {
  state = {
    editing: false,
    tempNewName: '',
    tempNewNumOf: '',
  }

  toggleEditingHandler = () => {
    // Build new pane obj and new pane
    const newPane = {};
    if (this.state.editing && this.state.tempNewName !== '' && this.state.tempNewNumOf !== '') {
      newPane.name = this.state.tempNewName;
      newPane.numOfLabel = this.state.tempNewNumOf;

      // Send to App with new pane to update panes
      this.props.addPane(newPane);
      
      // Clear input if it's the add new row
      if (this.props.new) {
        console.log('its new!');
        this.setState({ tempNewName: '', tempNewNumOf: '' });
      }
    }

    this.setState({ editing: !this.state.editing });
  }

  // Store temporarily in state until confirm
  nameChangedHandler = (newTempName) => {
    this.setState({ tempNewName: newTempName.slice() });
  }
  numOfChangedHandler = (newTempNumOf) => {
    this.setState({ tempNewNumOf: newTempNumOf.slice() });
  }



  render() {
    // Set up classes for component and add/edit/done button
    let classesArr = [classes.PaneEditor];
    let addButtonIcon;

    if (this.state.editing) {
      classesArr.push(classes.editing);

      addButtonIcon = <i className={"far fa-check-circle"}></i>;
    } else {
      if (this.props.new) {
        addButtonIcon = <i className="fas fa-plus-circle"></i>;
      } else {
        addButtonIcon = <i className="far fa-edit"></i>;
      }
    }

    return (
      <div className={classesArr.join(' ')}>
        <input
          type="text"
          className={classes.name}
          defaultValue={this.props.new ? this.state.tempNewName : this.props.name}
          onChange={(e) => this.nameChangedHandler(e.target.value)}
          disabled={!this.state.editing}
        />
        <div className={classes.numOfLabel}>
          <span>{this.props.numOfLabel ? '# of: ' : ''}</span>
          <input
            type="text"
            className={classes.numOfInput}
            defaultValue={this.props.new ? this.state.tempNewNumOf : this.props.numOfLabel}
            onChange={(e) => this.numOfChangedHandler(e.target.value)}
            disabled={!this.state.editing}
          />
        </div>

        <button
          // Edit/Done Editing button
          className={this.state.editing ? [classes.btnEdit, classes.btnDone].join(' ') : classes.btnEdit}
          onClick={this.toggleEditingHandler}
          onBlur={() => console.log('blur')}
        >{addButtonIcon}</button>

        <button
          // Delete button
          onClick={() => this.props.deleteClicked(this.props.id)}
          className={classes.btnRemove}
        ><i className="far fa-trash-alt"></i></button>
      </div>
    );
  }
}
 
export default PaneEditor;