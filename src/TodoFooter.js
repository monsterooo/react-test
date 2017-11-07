import React, { Component } from 'react';
import classnames from 'classnames';
import { pluralize, ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './util';

class TodoFooter extends Component {
  render() {
    const { nowShowing } = this.props;
    const activeTodoWord = pluralize(this.props.count, 'item');

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> {activeTodoWord} left
        </span>
        <ul className="filters">
          <li>
            <a
              href="javascript:;"
              onClick={() => this.props.handleShowing(ALL_TODOS)}
              className={classnames({selected: nowShowing === ALL_TODOS})}>
                All
            </a>
          </li>
          {' '}
          <li>
            <a
              href="javascript:;"
              onClick={() => this.props.handleShowing(ACTIVE_TODOS)}
              className={classnames({selected: nowShowing === ACTIVE_TODOS})}>
                Active
            </a>
          </li>
          {' '}
          <li>
            <a
              href="javascript:;"
              onClick={() => this.props.handleShowing(COMPLETED_TODOS)}
              className={classnames({selected: nowShowing === COMPLETED_TODOS})}>
                Completed
            </a>
          </li>
        </ul>
      </footer>
    );
  }
}

export default TodoFooter;
