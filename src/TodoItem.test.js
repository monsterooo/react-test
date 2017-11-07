import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
//import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TodoItem from './TodoItem';

Enzyme.configure({ adapter: new Adapter() });

const todo = {title: 'first todo', id: 1, completed: false};
it('test TodoItem', () => {
  const todoItem = shallow(<TodoItem todo={todo}/>);
  expect(todoItem.find('label').text()).toBe('first todo');
});
it('test TodoItem editing', () => {
  const todoItem = shallow(<TodoItem todo={todo} editing={true}/>);
  expect(todoItem.hasClass('editing')).toBe(true);
});
it('test TodoItem completed', () => {
  let todo = {title: 'first todo', id: 1, completed: true};
  const todoItem = shallow(<TodoItem todo={todo} />);
  expect(todoItem.hasClass('completed')).toBe(true);
});
