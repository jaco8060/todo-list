import { allTodos } from "./allTodos";
import { Todo } from "./todo";
import { webStorage } from "./webStorage";
class Project {
  constructor(projectName, index) {
    this._index = index;
    this._projectName = projectName;
    this._todoList = [];
  }

  get projectName() {
    return this._projectName;
  }
  get todoList() {
    return this._todoList;
  }

  get index() {
    return this._index;
  }

  set index(newIndex) {
    this._index = newIndex;
  }

  addProjectTask(title, details, date) {
    // Create todo list object
    const todoItem = new Todo(title, details, date);
    this._todoList.push(todoItem);

    // save to storage
    webStorage.saveToStorage(this._todoList, "myProjectList", this._index);

    allTodos.updateAllTodoListFromStorage(); //update all todos list
  }

  removeProjectTask = (todoToRemove) => {
    const index = this._todoList.findIndex((todo) => todo === todoToRemove);
    if (index !== -1) {
      this._todoList.splice(index, 1); // Remove the todo if found from the project list
    }
    // remove from storage
    webStorage.saveToStorage(this._todoList, "myProjectList", this._index);

    allTodos.updateAllTodoListFromStorage(); //update all todos list
  };
}

export { Project };
