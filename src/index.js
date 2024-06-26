import { allTodos } from "./modules/allTodos";
import { Project } from "./modules/projectController";
import { Todo } from "./modules/todo";
import { todoView } from "./modules/todoView";
import { webStorage } from "./modules/webStorage";
import "./style.css";
// const todoItem = new Todo("Workout", "Chest workout", new Date(2024, 1, 1));
// // Correct usage of TodoView
// todoView.displayTodo(todoItem);
document.addEventListener("DOMContentLoaded", (event) => {
  // Initialize your application or set up event listeners
  todoView.initializeListeners();

  webStorage.initializeStorage();
  // update dom
  todoView.updateProjectListDisplay();
  allTodos.updateAllTodoListFromStorage();

  //start at default inbox page

  // Simulate a click on the Inbox button to initialize the webpage with the Inbox view
  const inboxBtn = document.getElementById("inboxBtn");
  inboxBtn.click();
});

// const project1 = new Project("project1", 0);
// const project2 = new Project("project2", 1);
// const project3 = new Project("project3", 2);
// const project4 = new Project("project4", 3);
// project1.addProjectTask("Project1 task1", "HEHEHEHE", new Date(2024, 1, 3));
// project1.addProjectTask("Project1 task2", "XD", new Date(2024, 1, 9));

// project2.addProjectTask("TO BE REMOVED", "HEHEHEHE", new Date(2024, 1, 2));
// project2.addProjectTask("Project2 task2", "XD", new Date(2024, 1, 2));
// project2.addProjectTask("Project2 task3", "XD", new Date(2024, 1));

// const serializedProjectData = webStorage.loadStorage("myProjectList");
// const projectIndex = 0; // Example index if you're retrieving a specific project
// const projectData = serializedProjectData[projectIndex];
// const project = Project.rehydrate(projectData);

// console.log(project);

// todoView.updateProjectListDisplay();
// project2.removeProjectTask();
// console.log(allTodos.getTodoList());
// todoView.displayProjectList(project1);
// todoView.displayProjectList(project2);

// // console.log(allTodos.checkDate().today);
// // console.log(allTodos.checkDate().sevenEndDate);

// console.log(allTodos.getTodoList());
// console.log(allTodos.withinSevenList());
// console.log(allTodos.todayList());

// project1.todoList[0].makeStarred();
// console.log(allTodos.starredList());

// todoView.displayProjectList(project2);

// project2.removeProjectTask(project2.todoList[0]);
// console.log(allTodos.getTodoList());
