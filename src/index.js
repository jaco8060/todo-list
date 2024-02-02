import { allTodos } from "./modules/allTodos";
import { Project } from "./modules/projectController";
import { Todo } from "./modules/todo";
import { todoView } from "./modules/todoView";
import "./style.css";
const todoItem = new Todo("Workout", "Chest workout", new Date(2024, 1, 1));
// Correct usage of TodoView
todoView.displayTodo(todoItem);

const project1 = new Project("project1");
const project2 = new Project("project2");

project1.addProjectTask("Project1 task1", "HEHEHEHE", new Date(2024, 1, 3));
project1.addProjectTask("Project1 task2", "XD", new Date(2024, 1, 9));

project2.addProjectTask("Project2 task1", "HEHEHEHE", new Date(2024, 1, 2));
project2.addProjectTask("Project2 task2", "XD", new Date(2024, 1, 2));
project2.addProjectTask("Project2 task3", "XD", new Date(2024, 1));

todoView.displayProjectList(project1);
todoView.displayProjectList(project2);

// console.log(allTodos.checkDate().today);
// console.log(allTodos.checkDate().sevenEndDate);

console.log(allTodos.getTodoList());
console.log(allTodos.withinSevenList());
console.log(allTodos.todayList());

project1.todoList[0].makeStarred();
console.log(allTodos.starredList());
