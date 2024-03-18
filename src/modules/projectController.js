import { allTodos } from "./allTodos";
import { Todo } from "./todo";
import { webStorage } from "./webStorage";

class Project {
  constructor(projectName, index, saveImmediately = true) {
    this._index = index;
    this._projectName = projectName;
    this._todoList = [];
    if (saveImmediately) {
      this.saveProject(); // Only save if specified, is true
    }
  }

  get projectName() {
    return this._projectName;
  }

  set projectName(value) {
    this._projectName = value;
    this.saveProject(); // Save any changes
  }

  get todoList() {
    return this._todoList;
  }

  get index() {
    return this._index;
  }

  set index(newIndex) {
    this._index = newIndex;
    // this.saveProject(); // Save any changes
  }

  addProjectTask(title, details, date, index) {
    const todoItem = new Todo(title, details, date, index);
    this._todoList.push(todoItem);
    this.saveProject();
    allTodos.updateAllTodoListFromStorage();
  }

  removeProjectTask(todoToRemoveIndex) {
    this._todoList.splice(todoToRemoveIndex, 1);
    this.saveProject();
    allTodos.updateAllTodoListFromStorage();
  }

  sortTodoListByDate() {
    this._todoList.sort((a, b) => a.date - b.date);
    for (let i = 0; i < this._todoList.length; i++) {
      this._todoList[i].index = i;
    }
    // reset index of todos
    this.saveProject(); //  save the project after sorting
  }

  saveProject() {
    webStorage.saveToStorage(this.toJSON(), "myProjectList", this._index);
  }

  toJSON() {
    return {
      index: this._index,
      projectName: this._projectName,
      todoList: this._todoList.map((todo) => todo.toJSON()),
    };
  }

  static rehydrate(projectData) {
    // Using 'false' to prevent automatic saving during rehydration
    const project = new Project(
      projectData.projectName,
      projectData.index,
      false
    );
    projectData.todoList.forEach((todoData) => {
      const todo = new Todo(
        todoData.title,
        todoData.details,
        new Date(todoData.date),
        todoData.index
      );
      if (todoData.starred) todo.makeStarred();
      project._todoList.push(todo);
    });
    return project;
  }
}

export { Project };
