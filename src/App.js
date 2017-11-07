import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoFooter from './TodoFooter';
import { createTodo, ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './util';
import "./styles/base.css";
import "./styles/index.css";

const ENTER_KEY = 13;
class App extends Component {
  state = {
    newTodo: '',  // 当前输入todo
    todos: [],  // todos数据
    editing: null,
    nowShowing: ALL_TODOS
  }
  handleNewTodoKeyDown = (e) => {
    if (e.keyCode !== ENTER_KEY) {
      return;
    }
    e.preventDefault();
    var val = this.state.newTodo.trim();

    if (val) {
      this.setState({newTodo: '', todos: this.state.todos.concat(createTodo(val))});
    }
  }
  // toggle status
  toggle = (todoToToggle) => {
    const todos = this.state.todos.map((todo) => {
      if(todo.id !== todoToToggle.id) {
        return todo;
      }
      todo.completed = !todo.completed;
      return todo;
    })
    this.setState({todos});
  }
  // 编辑状态
  edit = (todo) => {
    this.setState({editing: todo.id});
  }
  save = (todo, text) => {
    const todos = this.state.todos.map((candidate) => {
      if(candidate.id !== todo.id) {
        return candidate;
      }
      candidate.title = text;
      return candidate;
    })
    this.setState({todos, editing: null});
  }
  destroy = (todo) => {
    const todos = this.state.todos.filter((candidate) => candidate.id !== todo.id);
    this.setState({todos});
  }
  cancel = () => {
    this.setState({editing: null});
  }
  toggleAll = (e) => {
    const checked = e.target.checked;
    const todos = this.state.todos.map((todo) => {
      todo.completed = checked;
      return todo;
    });
    this.setState({todos});
  }
  handleChange = (e) => {
    this.setState({newTodo: e.target.value});
  }
  handleShowing = (type) => {
    this.setState({nowShowing: type});
  }
  render() {
    let footer = null;
    const { todos, newTodo, nowShowing } = this.state;
    const shownTodos = todos.filter((todo) => {
      switch(nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });
    const todoItems = shownTodos.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={this.edit.bind(this, todo)}
          onToggle={this.toggle.bind(this, todo)}
          editing={this.state.editing === todo.id}
          onDestroy={this.destroy.bind(this, todo)}
          onSave={this.save.bind(this, todo)}
          onCancel={this.cancel}
        />
      )
    });
    const activeTodoCount = todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);
    const completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer =
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={this.clearCompleted}
          handleShowing={this.handleShowing}
        />;
    }

    const main = todos.length ? (
      <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
          onChange={this.toggleAll}
        />
        <ul className="todo-list">
          {todoItems}
        </ul>
      </section>
    ) : null
    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="你需要完成什么任务？"
            value={newTodo}
            onKeyDown={this.handleNewTodoKeyDown}
            onChange={this.handleChange}
            autoFocus={true}
          />
        </header>
        {main}
        {footer}
      </div>
    );
  }
}

export default App;
