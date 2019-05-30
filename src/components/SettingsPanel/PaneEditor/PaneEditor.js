import React, { Component } from 'react';

import classes from './PaneEditor.module.css';

class PaneEditor extends Component {
  state = {
    editing: false,
    tempNewName: '',
    tempNewNumOf: '',
  }

  componentWillMount() {
    // Set tempNew to passed in props if existent
    if (this.props.name && this.props.numOfLabel) {
      this.setState({
        tempNewName: this.props.name,
        tempNewNumOf: this.props.numOfLabel
      });
    }
  }

  componentWillUpdate() {
    if (this.props.new && !this.state.editing &&
      this.state.tempNewName !== '' && this.state.tempNewNumOf !== '') {
      this.setState({ tempNewName: '', tempNewNumOf: '' });
    }
  }

  toggleEditingHandler = () => {

    if (this.props.allowEditing) {
      if (this.state.editing && this.state.tempNewName !== '' && this.state.tempNewNumOf !== '') {

        if (this.props.new) {
          // Build new pane obj and new pane
          const newPane = {};
  
          newPane.name = this.state.tempNewName;
          newPane.numOfLabel = this.state.tempNewNumOf;

          // Send to App with new pane to update panes
          this.props.addPane(newPane);
          
          // Clear input if it's the add new row
          this.setState({ tempNewName: '', tempNewNumOf: '' });
          this.nameInput.value = '';
          this.numOfInput.value = '';
          
        } else {
          this.props.editPane({
            id: this.props.id,
            name: this.state.tempNewName,
            numOfLabel: this.state.tempNewNumOf
          });

          
        }
      }

      this.setState({ editing: !this.state.editing });
      // Disallow editing other rows
      // this.props.setAllowEditing(this.state.editing);
    }
    // else {
    //   // Allow editing other rows
    //   this.props.setAllowEditing(!this.state.editing);
    // }
  }

  // Store temporarily in state until confirm
  nameChangedHandler = (newTempName) => {
    this.setState({
      tempNewName: newTempName.slice(),
      clear: false,
    });
  }
  numOfChangedHandler = (newTempNumOf) => {
    this.setState({
      tempNewNumOf: newTempNumOf.slice(),
      clear: false,
    });
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
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className={classes.name}
            defaultValue={this.props.new ? '' : this.props.name}
            onChange={(e) => this.nameChangedHandler(e.target.value)}
            disabled={!this.state.editing}
            ref={el => this.nameInput = el}
            aria-label="Operation"
          />
          <div className={classes.numOf}>
            <label
              htmlFor="numOfInput"
            >
              {this.props.numOfLabel ? '# of: ' : ''}
            </label>
            <input
              type="text"
              id="numOfInput"
              className={classes.numOfInput}
              defaultValue={this.props.new ? '' : this.props.numOfLabel}
              onChange={(e) => this.numOfChangedHandler(e.target.value)}
              disabled={!this.state.editing}
              ref={el => this.numOfInput = el}
            />
          </div>

          <div>
            <button
              // Edit/Done Editing button
              className={this.state.editing ? [classes.btnEdit, classes.btnDone].join(' ') : classes.btnEdit}
              onClick={this.toggleEditingHandler}
              type="submit"
              tabIndex="-1"
              aria-label="Edit/Done Editing"
            >{addButtonIcon}</button>

            {this.props.new ? null : (
              <button
                // Delete button
                className={classes.btnRemove}
                onClick={() => this.props.deleteClicked(this.props.id)}
                tabIndex="-1"
                aria-label="Delete"
              ><i className="far fa-trash-alt"></i></button>
            )}
          </div>
        </form>
      </div>
    );
  }
}
 
export default PaneEditor;