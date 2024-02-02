import { allTodos } from "./modules/allTodos";
import { Project } from "./modules/projectController";
import { Todo } from "./modules/todo";
import { todoView } from "./modules/todoView";
import "./style.css";
const todoItem = new Todo(
  "Workout",
  "Chest workout",
  new Date().toLocaleDateString()
);

// Correct usage of TodoView
todoView.displayTodo(todoItem);

const project1 = new Project("project1");

project1.addProjectTask("Project1 task1", "HEHEHEHE", new Date(2024, 1, 3));
project1.addProjectTask("Project1 task2", "XD", new Date(2024, 1, 9));

todoView.displayProjectList(project1);

console.log(allTodos.checkDate().today);
console.log(allTodos.checkDate().sevenEndDate);

console.log(allTodos.getTodoList());
console.log(allTodos.withinSevenList());
