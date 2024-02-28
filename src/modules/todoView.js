class todoView {
  static displayTodo(Todo) {
    console.log(`Title: ${Todo.title}`);
    console.log(`Details: ${Todo.details}`);
    console.log(`Due Date: ${Todo.date}`);
    console.log(`Due Date: ${Todo.isOverdue}`);
  }
  static displayProjectList(projectList) {
    console.log(projectList.todoList);
  }

  static initializeListeners() {
    const inboxBtn = document.getElementById("inboxBtn");
    const todayBtn = document.getElementById("todayBtn");
    const weekBtn = document.getElementById("weekBtn");
    const addProjectPopup = document.getElementById("addProjectPopup");
    const addProject = document.querySelector("add-project");
    const cancelProject = document.querySelector("cancel-project");

    inboxBtn.addEventListener("click", this.displayContentWindow);
    todayBtn.addEventListener("click", this.displayContentWindow);
    weekBtn.addEventListener("click", this.displayContentWindow);
    addProjectPopup.addEventListener("click", this.showPopupDisplay);
    addProject.addEventListener("click", this.projectPopupDisplay);
    cancelProject.addEventListener("click", this.projectPopupDisplay);
  }
  static displayContentWindow(e) {}

  static hidePopupDisplay(e) {}

  static showPopupDisplay(e) {}

  static addProject(e) {}
}

export { todoView };
