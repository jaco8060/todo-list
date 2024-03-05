import { allTodos } from "./allTodos";
import { Todo } from "./todo";
import { webStorage } from "./webStorage";

class Project {
  constructor(projectName, index) {
    this._index = index;
    this._projectName = projectName;
    this._todoList = [];
    this.saveProject(); // Save the project upon creation
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
    this.saveProject(); // Save any changes
  }

  addProjectTask(title, details, date) {
    const todoItem = new Todo(title, details, date);
    this._todoList.push(todoItem);
    this.saveProject();
    allTodos.updateAllTodoListFromStorage();
  }

  removeProjectTask(todoToRemove) {
    const index = this._todoList.findIndex(
      (todo) =>
        todo.title === todoToRemove.title &&
        todo.details === todoToRemove.details &&
        todo.date.getTime() === todoToRemove.date.getTime()
    );
    if (index !== -1) {
      this._todoList.splice(index, 1);
      this.saveProject();
      allTodos.updateAllTodoListFromStorage();
    }
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
    const project = new Project(projectData.projectName, projectData.index);
    projectData.todoList.forEach((todoData) => {
      const todo = new Todo(
        todoData.title,
        todoData.details,
        new Date(todoData.date)
      );
      if (todoData.starred) todo.makeStarred(); // Assuming Todo has makeStarred method
      project._todoList.push(todo);
    });
    return project;
  }
}

export { Project };
