const allTodos = (function () {
  const allTodosList = [];

  const appendTodo = (todo) => {
    allTodosList.push(todo);
  };

  const getTodoList = allTodosList;
  return { getTodoList, appendTodo };
})();

export { allTodos };
