import { add, endOfDay, endOfToday, isBefore, startOfToday } from "date-fns";
import { webStorage } from "./webStorage";

const allTodos = (function () {
  // This variable holds all todo items. It's updated based on storage or other operations.
  let allTodosList = [];

  // Function to update allTodosList based on stored data
  const updateAllTodoListFromStorage = () => {
    let list = [];
    let allProjects = webStorage.loadStorage("myProjectList");

    if (Array.isArray(allProjects)) {
      for (let i = 0; i < allProjects.length; i++) {
        if (Array.isArray(allProjects[i])) {
          for (let j = 0; j < allProjects[i].length; j++) {
            list.push(allProjects[i][j]);
          }
        }
      }
    }

    allTodosList = list; // Update the allTodosList with the latest data
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

  // Call this function to initially populate allTodosList from storage
  updateAllTodoListFromStorage();

  return {
    updateAllTodoListFromStorage, // Allow manual update from storage if needed
    getTodoList,
    withinSevenList,
    todayList,
    starredList,
  };
})();

export { allTodos };
