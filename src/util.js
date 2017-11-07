const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'ACTIVE_TODOS';
const COMPLETED_TODOS = 'completed';

let uid = 0;
const createTodo = (title) => {
  uid++;
  return {
    id: uid,
    title,
    completed: false
  };
}
const pluralize = (count, word) => {
  return count === 1 ? word : word + 's';
}

export {
  createTodo,
  pluralize,
  ALL_TODOS,
  ACTIVE_TODOS,
  COMPLETED_TODOS
};
