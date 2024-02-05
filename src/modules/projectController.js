import { allTodos } from "./allTodos";
import { Todo } from "./todo";
class Project {
  constructor(projectName) {
    this._projectName = projectName;
    this._todoList = [];
    localStorage.setItem("projectStorage", JSON.stringify(todoItem));
  }

  get projectName() {
    return this._projectName;
  }
  get todoList() {
    return this._todoList;
  }

  addProjectTask(title, details, date) {
    // Create todo list object
    const todoItem = new Todo(title, details, date);
    this._todoList.push(todoItem);
    // save to storage

    allTodos.appendTodo(todoItem);
  }

  removeProjectTask = (todoToRemove) => {
    const index = this._todoList.findIndex((todo) => todo === todoToRemove);
    if (index !== -1) {
      this._todoList.splice(index, 1); // Remove the todo if found from the project list
    }
    allTodos.removeTodo(todoToRemove); //also remove from the all todos list
  };
}

export { Project };
