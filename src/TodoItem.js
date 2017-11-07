import React, { Component } from 'react';
import classnames from 'classnames';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;
class TodoItem extends Component {
  state = {
    editText: this.props.todo.title
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      var node = this.refs.editField;
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }
  handleEdit = (e) => {
    this.props.onEdit();
    this.setState({editText: this.props.todo.title});
  }
  handleSubmit = (e) => {
    var val = this.state.editText.trim();
    if (val) {
      this.props.onSave(val);
      this.setState({editText: val});
    } else {
      this.props.onDestroy();
    }
  }
  handleChange = (e) => {
    if (this.props.editing) {
      this.setState({editText: e.target.value});
    }
  }
  handleKeyDown = (e) => {
    if (e.which === ESCAPE_KEY) {
      this.setState({editText: this.props.todo.title});
      this.props.onCancel(e);
    } else if (e.which === ENTER_KEY) {
      this.handleSubmit(e);
    }
  }
  render() {
    return (
      <li className={classnames({
        completed: this.props.todo.completed,
        editing: this.props.editing
      })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={this.props.onToggle}
          />
          <label onDoubleClick={this.handleEdit}>
            {this.props.todo.title}
          </label>
          <button className="destroy" onClick={this.props.onDestroy} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
}

export default TodoItem;
