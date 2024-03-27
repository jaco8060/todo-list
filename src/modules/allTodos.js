import { add, endOfDay, endOfToday, isBefore, startOfToday } from "date-fns";
import { Project } from "./projectController";
import { webStorage } from "./webStorage";
const allTodos = (function () {
  // This variable holds all todo items. It's updated based on storage or other operations.

  // create project list for inbox
  const inboxProject = new Project("Inbox", 0, false);
  const todayProject = new Project("Today", 1, false);
  const thisWeekProject = new Project("This Week", 2, false);
  const starredProject = new Project("Starred", 3, false);

  // let inboxList = inboxProject.todoList;
  // let todayList = todayProject.todoList;
  // let thisWeekList = thisWeekProject.todoList;
  // let starredList = starredProject.todoList;

  // Function to update allTodosList based on stored data
  const updateAllTodoListFromStorage = () => {
    let allProjects = webStorage.loadStorage("myProjectList");
    // temp list to store todos for inbox
    let list = [];

    if (allProjects.length != 0) {
      //start from the 4th project (outside of the default projects)
      for (let i = 4; i < allProjects.length; i++) {
        const hydratedProject = Project.rehydrate(allProjects[i]);

        for (let i = 0; i < hydratedProject.todoList.length; i++) {
          hydratedProject.todoList[i].index = i;
          list.push(hydratedProject.todoList[i]);
        }
      }
    }
    inboxProject.todoList = list;
    thisWeekProject.todoList = updateWithinSevenList();
    todayProject.todoList = updateTodayList();
    starredProject.todoList = updateStarredList();

    //set isdefault for all the default projects to true
    inboxProject.isDefault = true;
    thisWeekProject.isDefault = true;
    todayProject.isDefault = true;
    starredProject.isDefault = true;

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
  // updateAllTodoListFromStorage();

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
