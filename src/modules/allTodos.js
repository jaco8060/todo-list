import { add, endOfDay, endOfToday, isBefore, startOfToday } from "date-fns";
import { Project } from "./projectController";
import { webStorage } from "./webStorage";
const allTodos = (function () {
  // This variable holds all todo items. It's updated based on storage or other operations.

  // create project list for inbox
  const inboxProject = new Project("Inbox", "inbox");
  const todayProject = new Project("Today", "today");
  const thisWeekProject = new Project("This Week", "thisWeek");
  const starredProject = new Project("Starred", "starred");

  // let inboxList = inboxProject.todoList;
  // let todayList = todayProject.todoList;
  // let thisWeekList = thisWeekProject.todoList;
  // let starredList = starredProject.todoList;

  // Function to update allTodosList based on stored data
  const updateAllTodoListFromStorage = () => {
    let allProjects = webStorage.loadStorage("myProjectList");
    // temp list to store todos for inbox
    let list = [];
    // console.log(allProjects);

    if (allProjects.length != 0) {
      allProjects.forEach((project) => {
        const hydratedProject = Project.rehydrate(project);
        let count = 0;
        hydratedProject.todoList.forEach((todo) => {
          // console.log(todo);
          todo.index = count;
          list.push(todo);
          count++;
        });
      });
    }
    inboxProject.todoList = list;
    thisWeekProject.todoList = updateWithinSevenList();
    todayProject.todoList = updateTodayList();
    starredProject.todoList = updateStarredList();

    //update indices:
    updateIndices(inboxProject);
    updateIndices(thisWeekProject);
    updateIndices(todayProject);
    updateIndices(starredProject);

    // save rehydrated projects to storage:
    inboxProject.saveProject();
    thisWeekProject.saveProject();
    todayProject.saveProject();
    starredProject.saveProject();
  };

  const getInboxTodoList = () => inboxProject.todoList;
  const getTodayTodoList = () => todayProject.todoList;
  const getWithinSevenList = () => thisWeekProject.todoList;
  const getStarredTodoList = () => starredProject.todoList;
  const checkDate = () => {
    const today = startOfToday();
    const addSevenFromToday = add(today, {
      days: 7,
    });
    const sevenEndDate = endOfDay(addSevenFromToday);

    return { today, sevenEndDate };
  };

  const updateWithinSevenList = () => {
    // console.log(getInboxTodoList());
    return getInboxTodoList().filter((todo) =>
      isBefore(todo.date, checkDate().sevenEndDate)
    );
  };

  const updateIndices = (project) => {
    // console.log(project.todoList.length);
    for (let i = 0; i < project.todoList.length; i++) {
      project.todoList[i].index = i;
    }
  };

  const updateTodayList = () => {
    return getInboxTodoList().filter((todo) =>
      isBefore(todo.date, endOfToday())
    );
  };

  const updateStarredList = () => {
    return getInboxTodoList().filter((todo) => todo.starred === true);
  };

  // Call this function to initially populate allTodosList from storage
  updateAllTodoListFromStorage();

  return {
    updateAllTodoListFromStorage, // Allow manual update from storage if needed
    getInboxTodoList,
    updateWithinSevenList,
    updateTodayList,
    updateStarredList,
    getWithinSevenList,
    getTodayTodoList,
    getStarredTodoList,
    updateIndices,
  };
})();

export { allTodos };
