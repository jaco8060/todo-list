import { allTodos } from "./modules/allTodos";
import { Project } from "./modules/projectController";
import { Todo } from "./modules/todo";
import { todoView } from "./modules/todoView";
import "./style.css";
const todoItem = new Todo(
  "Workout",
  "Chest workout",
  new Date().toLocaleDateString(),
  "Gym Stuff"
);

// Correct usage of TodoView
todoView.displayTodo(todoItem);

const project1 = new Project("project1");

project1.addProjectTask("Project1", "HEHEHEHE", new Date());
project1.addProjectTask("Project2", "XD", new Date());

todoView.displayProjectList(project1);

console.log(allTodos.getTodoList);
