import { allTodos } from "./allTodos";
import { Todo } from "./todo";
class Project {
  constructor(projectName) {
    this._projectName = projectName;
    this._todoList = [];
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
    allTodos.appendTodo(todoItem);
  }
}

export { Project };
