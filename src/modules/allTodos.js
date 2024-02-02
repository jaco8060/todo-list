import { add, endOfDay, endOfToday, isBefore, startOfToday } from "date-fns";

const allTodos = (function () {
  const allTodosList = [];
  const appendTodo = (todo) => {
    allTodosList.push(todo);
  };

  const removeTodo = (todoToRemove) => {
    const index = allTodosList.findIndex((todo) => todo === todoToRemove);
    if (index !== -1) {
      allTodosList.splice(index, 1); // Remove the todo if found
    }
  };

  const getTodoList = () => allTodosList;

  const checkDate = () => {
    const today = startOfToday();
    const addSevenFromToday = add(today, {
      days: 7,
    });
    const sevenEndDate = endOfDay(addSevenFromToday);

    return { today, sevenEndDate };
  };

  const withinSevenList = () => {
    return allTodosList.filter((todo) =>
      isBefore(todo.date, checkDate().sevenEndDate)
    );
  };

  const todayList = () => {
    return allTodosList.filter((todo) => isBefore(todo.date, endOfToday()));
  };

  const starredList = () => {
    return allTodosList.filter((todo) => todo.starred === true);
  };

  return {
    getTodoList,
    appendTodo,
    withinSevenList,
    todayList,
    starredList,
    removeTodo,
  };
})();

export { allTodos };
