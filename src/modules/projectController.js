import { allTodos } from "./allTodos";
import { Todo } from "./todo";
import { webStorage } from "./webStorage";

class Project {
  constructor(projectName, index, saveImmediately = true) {
    this._index = index;
    this._projectName = projectName;
    this._todoList = [];
    this._isDefault = false; //for inbox, today, this week, starred project lists
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

  set isDefault(boolean) {
    this._isDefault = boolean;
  }

  set todoList(newList) {
    this._todoList = newList;
  }

  addProjectTask(title, details, date, index) {
    const todoItem = new Todo(title, details, date, index);
    this._todoList.push(todoItem);
    this.saveProject();
    // allTodos.updateAllTodoListFromStorage();
  }

  removeProjectTask(todoToRemoveIndex) {
    this._todoList.splice(todoToRemoveIndex, 1);
    this.saveProject();
    // allTodos.updateAllTodoListFromStorage();
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

  saveDefaultProject() {
    webStorage.saveToStorage(this.toJSON(), "defaultProjectList", this._index);
  }

  toJSON() {
    return {
      index: this._index,
      projectName: this._projectName,
      todoList: this._todoList.map((todo) => todo.toJSON()),
      isDefault: this._isDefault,
    };
  }

  static rehydrate(projectData) {
    const project = new Project(
      projectData.projectName,
      projectData.index,
      false // Prevent automatic saving during rehydration
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
    project.isDefault = projectData.isDefault; // Set isDefault based on saved data
    return project;
  }
}

export { Project };
