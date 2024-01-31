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
