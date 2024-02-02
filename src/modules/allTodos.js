import {
  add,
  endOfDay,
  isAfter,
  isBefore,
  isToday,
  startOfToday,
} from "date-fns";

const allTodos = (function () {
  const allTodosList = [];
  const starredList = [];
  const appendTodo = (todo) => {
    allTodosList.push(todo);
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

  return { getTodoList, appendTodo, checkDate, withinSevenList };
})();

export { allTodos };
